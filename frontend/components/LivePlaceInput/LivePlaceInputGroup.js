// @flow

import React from 'react';
import { arrayOf, shape, instanceOf, func } from 'prop-types';
// import cx from 'classnames';
import type { Place } from '../../../flowtype/Place.type';
import { emptyPlace } from '../../constants/emptyPlace';
import { Style } from '../';
import LivePlaceInput from './LivePlaceInput';
import { classNames as cs, stylesheet } from './LivePlaceInputGroup.scss';

type Props = {
  places: Place[],
  onChange: (Place[]) => void,
};

export default class LivePlaceInputGroup extends React.PureComponent<Props> {
  static propTypes = {
    places: arrayOf(
      shape({
        location: shape(),
        fromDate: instanceOf(Date),
        toDate: instanceOf(Date),
      })
    ),
    onChange: func,
  };

  static defaultProps = {
    places: [],
    onChange() {},
  };

  changePlace(idx: number, value: Place) {
    const { places, onChange } = this.props;
    const newPlaces = [...places];

    if (idx === 0 && !newPlaces.length) {
      newPlaces.push({ ...emptyPlace });
    }

    if (newPlaces[idx]) {
      newPlaces[idx] = value;
      onChange(newPlaces);
    }
  }

  addPlace() {
    const { places, onChange } = this.props;
    const newPlaces = [...places];

    if (!newPlaces.length) {
      newPlaces.push({ ...emptyPlace });
    }

    newPlaces.push({ ...emptyPlace });

    onChange(newPlaces);
  }

  removePlace(idx: number) {
    const { places, onChange } = this.props;
    const newPlaces = [...places];

    newPlaces.splice(idx, 1);

    onChange(newPlaces);
  }

  render() {
    let { places } = this.props;
    if (!places.length) {
      places = [{ ...emptyPlace }];
    }

    return (
      <div className={cs.LivePlaceInputGroup}>
        <Style stylesheet={stylesheet} />

        {places.map((place, idx) => (
          <LivePlaceInput
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            value={place}
            canRemove={places.length > 1 && idx < places.length - 1}
            onChange={value => this.changePlace(idx, value)}
            onRemove={() => this.removePlace(idx)}
          />
        ))}

        <br />
        <div className="row center-xs">
          <div className="col-xs-1" />
          <div className="col-xs-11">
            <button className={cs.addButton} onClick={() => this.addPlace()}>
              +
            </button>
            <span className={cs.addItems}>
              {' '}
              Add more zipcodes or cities where you lived and select month &
              year{' '}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
