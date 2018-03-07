// @flow

import React from 'react';
import cx from 'classnames';
import { shape, instanceOf, bool, func } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
// import cx from 'classnames';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import type { Place } from '../../../flowtype/Place.type';
import type { Location } from '../../../flowtype/Location.type';
import { emptyPlace } from '../../constants/emptyPlace';
import { MonthPicker, Style } from '../';
import { classNames as cs, stylesheet } from './LivePlaceInput.scss';

type Props = {
  value: Place,
  canRemove: boolean,
  onChange: Place => void,
  onRemove: () => void,
};

type State = { value: Place };

export default class LivePlaceInput extends React.PureComponent<Props, State> {
  static propTypes = {
    value: shape({
      location: shape(),
      fromDate: instanceOf(Date),
      toDate: instanceOf(Date),
    }),
    canRemove: bool,
    onChange: func,
    onRemove: func,
  };

  static defaultProps = {
    value: emptyPlace,
    canRemove: false,
    onChange() {},
    onRemove() {},
  };

  state = {
    value: {
      location: _.get(
        this.props.value,
        'location.formatted_address',
        emptyPlace.location
      ),
      fromDate: _.get(this.props.value, 'fromDate', new Date()),
      toDate: _.get(this.props.value, 'toDate', new Date()),
    },
  };

  componentWillReceiveProps(nextProps: Props) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        value: {
          ...nextProps.value,
          location: _.get(nextProps.value, 'location.formatted_address', ''),
        },
      });
    }
  }

  handleLocationChange(location: Location) {
    this.setState({ value: { ...this.state.value, location } });
  }

  async handleLocationBlur() {
    const { onChange } = this.props;
    const { value: { location, fromDate, toDate } } = this.state;

    if (!location) {
      return;
    }

    const results = await geocodeByAddress(location);
    if (!results.length) {
      return;
    }

    const coords = await getLatLng(results[0]);
    if (!coords) {
      return;
    }

    onChange({
      location: {
        ...results[0],
        coords,
      },
      fromDate,
      toDate,
    });
  }

  handleFromDateChange(fromDate: Date) {
    const { value: { location }, onChange } = this.props;
    const { value: { toDate } } = this.state;

    if (toDate - fromDate < 0) {
      fromDate = toDate;
    }

    this.setState({ value: { ...this.state.value, fromDate } }, () => {
      onChange({ location, fromDate, toDate });
    });
  }

  handleToDateChange(toDate: Date) {
    const { value: { location }, onChange } = this.props;
    const { value: { fromDate } } = this.state;

    if (toDate - fromDate < 0) {
      toDate = fromDate;
    }

    this.setState({ value: { ...this.state.value, toDate } }, () => {
      onChange({ location, fromDate, toDate });
    });
  }

  render() {
    const { canRemove, onRemove } = this.props;
    const { value: { location, fromDate, toDate } } = this.state;

    return (
      <div className={cs.LivePlaceInput}>
        <Style stylesheet={stylesheet} />

        <div className="row">
          <div className="col-xs-1" id="date" />
        </div>
        <div className="row">
          <div className="col-xs">
            <PlacesAutocomplete
              googleLogo={false}
              clearItemsOnError
              highlightFirstSuggestion
              inputProps={{
                value: location,
                onChange: v => this.handleLocationChange(v),
                onBlur: () => this.handleLocationBlur(),
                placeholder: 'Enter your zip code or city (US) to add more...',
                autoFocus: true,
              }}
            />
          </div>

          <div className="col-xs-4">
            <i
              className={cx('fa fa-calendar-o fa-2x', cs.calendar)}
              aria-hidden="true"
            />
            <MonthPicker
              value={fromDate}
              onChange={v => this.handleFromDateChange(v)}
              min={moment()
                .year(1900)
                .startOf('year')
                .toDate()}
              max={toDate}
            />
            &nbsp;&mdash;&nbsp;
            <MonthPicker
              value={toDate}
              onChange={v => this.handleToDateChange(v)}
              min={fromDate}
              max={moment()
                .endOf('month')
                .toDate()}
            />
          </div>

          <div className="col-xs-1" />

          {canRemove && (
            <div className="col-xs-1">
              <button className={cs.removeButton} Click={() => onRemove()}>
                Remove
              </button>
            </div>
          )}
        </div>
        <br />
      </div>
    );
  }
}
