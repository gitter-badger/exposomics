"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _TimeSeriesLocations = _interopRequireDefault(require("./TimeSeriesLocations"));

var _ExposomicsLocation = _interopRequireDefault(require("./ExposomicsLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $FlowFixMe

/**
 * `ExposomicsLocationManager` adds Exposomics-specific helper functions to `TimeSeriesLocations`. In particular, the constructor
 * takes the array of `places` provided by the front-end and converts them into `ExposomicsLocation` objects. The `getLocation` functionality
 * is inherited from `TimeSeriesLocations`.
 */
class ExposomicsLocationManager extends _TimeSeriesLocations.default {
  /**
   * For each place in `places`, extract the start time, end time, and location, and add those to the data representation in the base class `TimeSeriesLocations`
   * @param {Array.<Object>} places A json object of location and time data from the Google Api
   */
  constructor(places) {
    super();

    for (const p of places) {
      const start = (0, _moment.default)(p.fromDate);
      const end = (0, _moment.default)(p.toDate);
      const location = new _ExposomicsLocation.default(p);
      this.addPlace(location, start, end); // addPlace is a method inherited from TimeSeriesLocations
    }
  }
  /**
   * Returns a list of all user-submitted counties.
   *
   * @return {Array.<String>}
   */


  getCountyList() {
    const result = [];

    for (const locationObject of this.locationObjects) {
      const county = locationObject.location.getCounty();
      result.push(county);
    }

    return result;
  }

  getStartDate() {
    let min;

    for (const item of this.locationObjects) {
      if (!min || min.diff(item.startDate) > 0) {
        min = item.startDate;
      }
    }

    return min;
  }

  getEndDate() {
    let max;

    for (const item of this.locationObjects) {
      if (!max || max.diff(item.endDate) < 0) {
        max = item.endDate;
      }
    }

    return max;
  }

}

exports.default = ExposomicsLocationManager;