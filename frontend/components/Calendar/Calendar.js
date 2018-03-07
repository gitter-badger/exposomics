// @flow

import React from 'react';
import { instanceOf, func } from 'prop-types';
import moment from 'moment';
import cx from 'classnames';
import { prepareMoment, findYearsPageNumber, getYearsPage } from '../../utils';
import Style from '../Style';
import { classNames as cs, stylesheet } from './Calendar.scss';

type Props = {
  value: Date,
  min: Date,
  max: Date,
  onChange: Date => void,
};

type CurrentView = 'M' | 'Y';

type State = {
  value: ?moment,
  yearsPage: number,
  monthSelected: boolean,
  yearSelected: boolean,
  currentView: CurrentView,
};

export default class Calendar extends React.Component<Props, State> {
  static propTypes = {
    value: instanceOf(Date),
    min: instanceOf(Date),
    max: instanceOf(Date),
    onChange: func,
  };

  static defaultProps = {
    value: null,
    min: null,
    max: null,
    onChange() {},
  };

  static renderButtonPlaceholder(
    cols: number = 3,
    key: ?string | number = null
  ) {
    return (
      <div key={key || undefined} className={cx(`col-xs-${cols}`, cs.button)} />
    );
  }

  state = {
    value: this.props.value ? prepareMoment(this.props.value) : null,
    yearsPage: findYearsPageNumber(this.props.value || new Date()),
    monthSelected: !!this.props.value,
    yearSelected: !!this.props.value,
    currentView: 'Y',
  };

  componentWillReceiveProps(nextProps: Props) {
    const { value } = this.state;
    if (nextProps) {
      const newValue = prepareMoment(nextProps.value);

      if (value && value.format('MM/YYYY') !== newValue.format('MM/YYYY')) {
        this.setState({
          value: newValue,
          yearsPage: findYearsPageNumber(nextProps.value),
          monthSelected: true,
          yearSelected: true,
          currentView: 'M',
        });
      }
    }
  }

  get value(): moment {
    const { value } = this.state;
    if (value) {
      return value.clone();
    }

    return prepareMoment(moment());
  }

  get yearsPage(): number[] {
    const { yearsPage } = this.state;

    return getYearsPage(yearsPage);
  }

  selectYear(year: number) {
    this.setState({
      value: this.value.year(year),
      yearSelected: true,
      currentView: 'M',
    });
  }

  decrementYear() {
    const { min } = this.props;

    let year = this.value.year() - 1;
    if (year < moment(min).year()) {
      year = moment(min).year();
    }

    this.setState({
      value: this.value.year(year),
    });
  }

  incrementYear() {
    const { max } = this.props;

    let year = this.value.year() + 1;
    if (year > moment(max).year()) {
      year = moment(max).year();
    }

    this.setState({
      value: this.value.year(year),
    });
  }

  selectMonth(month: number) {
    this.setState(
      {
        value: this.value.month(month),
        monthSelected: true,
        currentView: 'M',
      },
      () => {
        this.props.onChange(this.value.toDate());
      }
    );
  }

  handlePrevPage() {
    let { yearsPage } = this.state;

    yearsPage -= 1;
    if (yearsPage < 0) {
      yearsPage = 0;
    }

    this.setState({ yearsPage });
  }

  handleNextPage() {
    const { yearsPage } = this.state;

    this.setState({ yearsPage: yearsPage + 1 });
  }

  switchView(currentView: CurrentView) {
    this.setState({ currentView });
  }

  renderPrevYearsPageBtn() {
    const { min } = this.props;
    const { currentView } = this.state;
    const yearsPage = this.yearsPage;

    if (currentView !== 'Y') {
      return null;
    }

    if (min && yearsPage[0] <= moment(min).year()) {
      return Calendar.renderButtonPlaceholder();
    }

    return (
      <button
        className={cx('col-xs-3', cs.button)}
        onClick={() => this.handlePrevPage()}
      >
        &lt;
      </button>
    );
  }

  renderPrevYearBtn() {
    const { min } = this.props;
    const { currentView } = this.state;

    if (currentView !== 'M') {
      return null;
    }

    if (min && this.value.year() <= moment(min).year()) {
      return Calendar.renderButtonPlaceholder();
    }

    return (
      <button
        className={cx('col-xs-3', cs.button)}
        onClick={() => this.decrementYear()}
      >
        &lt;
      </button>
    );
  }

  renderNextYearsPageBtn() {
    const { max } = this.props;
    const { currentView } = this.state;
    const yearsPage = this.yearsPage;

    if (currentView !== 'Y') {
      return null;
    }

    if (max && yearsPage[yearsPage.length - 1] >= moment(max).year()) {
      return Calendar.renderButtonPlaceholder();
    }

    return (
      <button
        className={cx('col-xs-3', cs.button)}
        onClick={() => this.handleNextPage()}
      >
        &gt;
      </button>
    );
  }

  renderNextYearBtn() {
    const { max } = this.props;
    const { currentView } = this.state;

    if (currentView !== 'M') {
      return null;
    }

    if (max && this.value.year() >= moment(max).year()) {
      return Calendar.renderButtonPlaceholder();
    }

    return (
      <button
        className={cx('col-xs-3', cs.button)}
        onClick={() => this.incrementYear()}
      >
        &gt;
      </button>
    );
  }

  renderMonths() {
    const { min, max } = this.props;
    const { value, monthSelected } = this.state;

    return Array(12)
      .fill(1)
      .map((i, month) => {
        const monthName = moment()
          .startOf('year')
          .month(month)
          .date(15)
          .format('MMM');

        if (min) {
          const minYear = moment(min).year();
          const minMonth = moment(min).month();

          if (value && minYear >= value.year() && month < minMonth) {
            return Calendar.renderButtonPlaceholder(4, monthName);
          }
        }

        if (max) {
          const maxYear = moment(max).year();
          const maxMonth = moment(max).month();

          if (value && value.year() >= maxYear && month > maxMonth) {
            return Calendar.renderButtonPlaceholder(4, monthName);
          }
        }

        return (
          <button
            key={monthName}
            onClick={() => this.selectMonth(month)}
            className={cx('col-xs-4', cs.button, {
              [cs.selected]: monthSelected && this.value.month() === month,
            })}
          >
            {monthName}
          </button>
        );
      });
  }

  renderYears() {
    const { min, max } = this.props;
    const { yearsPage, yearSelected } = this.state;

    return getYearsPage(yearsPage || 1).map(year => {
      const selected = yearSelected && this.value.year() === year;

      if (min && year < moment(min).year()) {
        return Calendar.renderButtonPlaceholder(4, year);
      }

      if (max && year > moment(max).year()) {
        return Calendar.renderButtonPlaceholder(4, year);
      }

      return (
        <button
          key={year}
          onClick={() => this.selectYear(year)}
          className={cx('col-xs-4', cs.button, {
            [cs.selected]: selected,
          })}
          ref={el => {
            if (el && selected) {
              el.focus();
            }
          }}
        >
          {year}
        </button>
      );
    });
  }

  render() {
    const { value, currentView } = this.state;
    const yearsPage = this.yearsPage;

    return (
      <div className={cs.Calendar}>
        <Style stylesheet={stylesheet} />

        <div className="row">
          {this.renderPrevYearsPageBtn()}
          {this.renderPrevYearBtn()}

          {currentView === 'M' && (
            <button
              className={cx('col-xs', cs.button)}
              onClick={() => this.switchView('Y')}
            >
              {value ? value.format('YYYY') : ''}
            </button>
          )}

          {currentView === 'Y' && (
            <div className={cx('col-xs', cs.button)}>
              {`${yearsPage[0]} - ${yearsPage[yearsPage.length - 1]}`}
            </div>
          )}

          {this.renderNextYearsPageBtn()}
          {this.renderNextYearBtn()}
        </div>

        <div className="row">
          {currentView === 'Y' ? this.renderYears() : this.renderMonths()}
        </div>
      </div>
    );
  }
}
