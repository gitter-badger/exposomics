// @flow

import React from 'react';
import { instanceOf, func } from 'prop-types';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import FocusTrap from 'react-focus-trap';
import { prepareMoment } from '../../utils';
import Calendar from '../Calendar/Calendar';
import Style from '../Style';
import { classNames as cs, stylesheet } from './MonthPicker.scss';

type Props = {
  onChange: Date => void,
  value: Date,
  min: Date,
  max: Date,
};

type State = {
  value: moment,
  showCalendar: boolean,
};

class MonthPicker extends React.Component<Props, State> {
  static propTypes = {
    onChange: func.isRequired,
    value: instanceOf(Date),
    min: instanceOf(Date),
    max: instanceOf(Date),
  };

  static defaultProps = {
    value: new Date(),
    min: null,
    max: null,
  };

  state = {
    value: prepareMoment(this.props.value),
    showCalendar: false,
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({ value: prepareMoment(nextProps.value) });
    }
  }

  onChange(value) {
    value = prepareMoment(value);
    this.setState({
      value,
      showCalendar: false,
    });

    this.props.onChange(value.toDate());
  }

  handleClickOutside() {
    this.hideCalendar();
  }

  showCalendar() {
    this.setState({ showCalendar: true });
  }

  hideCalendar() {
    this.setState({ showCalendar: false });
  }

  render() {
    const { min, max } = this.props;
    const { value, showCalendar } = this.state;

    return (
      <div className={cs.MonthPicker}>
        <Style stylesheet={stylesheet} />

        <button className={cs.button} onClick={() => this.showCalendar()}>
          {value.format('MMM YYYY')}
        </button>

        {showCalendar && (
          <FocusTrap onExit={() => this.hideCalendar()} active>
            <div className={cs.calendarContainer}>
              <Calendar
                value={value.toDate()}
                min={min}
                max={max}
                onChange={val => this.onChange(val)}
              />
            </div>
          </FocusTrap>
        )}
      </div>
    );
  }
}

export default onClickOutside(MonthPicker);
