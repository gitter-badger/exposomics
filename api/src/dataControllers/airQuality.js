// @flow

import moment from 'moment';
import { Op } from 'sequelize';
import ExposomicsLocationManager from '@doc.ai/exposomics-common/lib/utils/ExposomicsLocationManager';
import { models } from '../db';

const { AirQualityRecord } = models;

/**
 * This function accepts a list of places (json) and returns data to be rendered by the React component

 * @param {Place[]} places A json object of location and time data from the Google Api

 * @return {Object}
 * @property {moment} result.startDate
 * @property {moment} result.endDate
 * @property {Array} result.dataList
 */
export default async (
  locationManager: ExposomicsLocationManager
): Promise<Object> => {
  const batchQueryLogic = async function batchQueryLogic({
    location,
    startDate,
    endDate,
  }) {
    const state = location.getState();
    let county = location.getCounty();
    county = county.replace(' County', '');

    let result;
    try {
      result = await AirQualityRecord.findAll({
        attributes: ['state', 'county', 'date', 'aqi'],
        where: {
          state,
          county,
          date: {
            [Op.and]: [{ [Op.gt]: startDate }, { [Op.lt]: endDate }],
          },
        },
      });
      // console.log('result is: ');
      // console.log(result);
    } catch (e) {
      console.log('database error.');
      console.log(e);
    }

    let retArray;
    if (!result) {
      retArray = Array(endDate.diff(startDate, 'days')).fill(-2);
    } else {
      retArray = [];
      for (const r of result) {
        if (r.aqi == null) {
          continue; // eslint-disable-line no-continue
        }
        const nObj = {
          date: moment(r.date, 'YYYY-MM-DD'),
          value: r.aqi,
        };
        // console.log(nObj);
        retArray.push(nObj);
      }
    }

    return retArray;
  };

  const result = [];
  for (const l of locationManager.locationObjects) {
    const locationResults = await batchQueryLogic(l);
    for (const r of locationResults) {
      result.push(r);
    }
  }

  return {
    airQuality: result,
  };
};
