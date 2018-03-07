// @flow

// $FlowFixMe
import moment from 'moment';
import type { Place } from '../../../flowtype/Place.type';
import TimeSeriesLocations from './TimeSeriesLocations';
import ExposomicsLocation from './ExposomicsLocation';

/**
 * `ExposomicsLocationManager` adds Exposomics-specific helper functions to `TimeSeriesLocations`. In particular, the constructor
 * takes the array of `places` provided by the front-end and converts them into `ExposomicsLocation` objects. The `getLocation` functionality
 * is inherited from `TimeSeriesLocations`.
 */
export default class ExposomicsLocationManager extends TimeSeriesLocations {
  /**
   * For each place in `places`, extract the start time, end time, and location, and add those to the data representation in the base class `TimeSeriesLocations`
   * @param {Array.<Object>} places A json object of location and time data from the Google Api
   */
  constructor(places: Place[]) {
    super();

    for (const p of places) {
      const start = moment(p.fromDate);
      const end = moment(p.toDate);
      const location = new ExposomicsLocation(p);

      this.addPlace(location, start, end); // addPlace is a method inherited from TimeSeriesLocations
    }
  }

  /**
   * Returns a list of all user-submitted counties.
   *
   * @return {Array.<String>}
   */
  getCountyList(): string[] {
    const result = [];

    for (const locationObject of this.locationObjects) {
      const county = locationObject.location.getCounty();
      result.push(county);
    }

    return result;
  }

  getStartDate(): moment {
    let min;

    for (const item of this.locationObjects) {
      if (!min || min.diff(item.startDate) > 0) {
        min = item.startDate;
      }
    }

    return min;
  }

  getEndDate(): moment {
    let max;

    for (const item of this.locationObjects) {
      if (!max || max.diff(item.endDate) < 0) {
        max = item.endDate;
      }
    }

    return max;
  }
}
