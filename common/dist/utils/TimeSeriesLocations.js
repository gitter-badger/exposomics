"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _ExposomicsLocation = _interopRequireDefault(require("./ExposomicsLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $FlowFixMe

/**
 * A class that abstracts away the details of time-dependent locations by providing the `getLocation` function.
 * To use this class, create a new `TimeSeriesLocations` object, and then repeatedly call `addPlace` to populate
 * its internal list of places and times. Then, call the `getLocation` function to find out what location
 * corresponds to a particular date.
 *
 */
class TimeSeriesLocations {
  /** @type {Array.<object>} */
  constructor() {
    this.locationObjects = [];
  }
  /**
   * Add a new place
   *
   * @param {ExposomicsLocation} location
   * @param {moment} start
   * @param {moment} end
   */


  addPlace(location, start, end) {
    const obj = {
      location,
      startDate: start,
      endDate: end
    };
    this.locationObjects.push(obj);
  }
  /** Get the location corresponding to a particular date
   *
   * @param {moment} date
   * @return {ExposomicsLocation}
   */


  getLocation(date) {
    for (let i = 0; i < this.locationObjects.length; i += 1) {
      const lobj = this.locationObjects[i];
      const start = lobj.startDate;
      const end = lobj.endDate; // console.log(date, start, end)

      if (date.isAfter(start) && date.isBefore(end)) {
        // console.log("found: ", lobj.location)
        return lobj.location;
      }
    } // console.log('no date found');


    return undefined;
  }

}

exports.default = TimeSeriesLocations;