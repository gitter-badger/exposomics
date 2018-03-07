// @flow

import { Readable } from 'stream';
import Sequelize from 'sequelize';
import request from 'request';
import progress from 'request-progress';
import ProgressBar from 'progress';
import bytes from 'bytes';
import unzip from 'unzip';
import csv from 'csv';
import es from 'event-stream';
import moment from 'moment';

export default {
  up: async (queryInterface: Sequelize.QueryInterface) => {
    const promises = [];
    let bar = null;

    let recordsAdded = 0;
    function putRecordsToDb(records) {
      const recordsToPut = records.length;
      promises.push(
        queryInterface.bulkInsert('WeatherRecords', records).then(() => {
          recordsAdded += recordsToPut;
        })
      );

      records.length = 0;
    }

    await new Promise((resolve, reject) => {
      progress(
        request.get(
          'https://s3-us-west-1.amazonaws.com/ai.doc.exposomics/temperature.zip'
        )
      )
        .on('progress', state => {
          if (!bar) {
            bar = new ProgressBar(
              ':sizeTransferred/:sizeTotal [:bar] :percent :speed [:recordsAdded records added] (:timeLeft)',
              {
                total: state.size.total,
              }
            );
          }

          bar.tick(state.size.transferred - bar.curr, {
            sizeTotal: bytes(state.size.total, { unitSeparator: ' ' }),
            sizeTransferred: bytes(state.size.transferred, {
              unitSeparator: ' ',
            }),
            timeLeft: moment()
              .subtract(state.time.remaining, 'seconds')
              .toNow(true),
            speed: `${bytes(state.speed, { unitSeparator: ' ' })}/s`,
            recordsAdded,
          });
        })
        .on('error', err => {
          if (bar) {
            bar.interrupt(err.message);
          }
        })
        .on('end', () => {
          if (bar) {
            bar.terminate();
          }
        })
        .pipe(unzip.Parse())
        .on('error', reject)
        .on('entry', entry => {
          const records = [];

          const rs = new Readable({ read() {} });
          rs.pipe(
            csv.transform(item => {
              records.push(JSON.parse(item.toString()));

              if (records.length > 1000) {
                putRecordsToDb(records);
              }
            })
          );

          if (entry.path.endsWith('.csv')) {
            entry
              .pipe(es.split())
              .pipe(
                es.map((item, cb) =>
                  csv.parse(item.toString(), (err, data) => {
                    if (err) {
                      cb(err);
                      return;
                    }

                    if (
                      Array.isArray(data) &&
                      data.length &&
                      Array.isArray(data[0])
                    ) {
                      const zipcode = String(data[0][0]);
                      const date = String(data[0][1]);
                      const tmax =
                        data[0][2] === '\\N' ? null : Number(data[0][2]);
                      const tmin =
                        data[0][3] === '\\N' ? null : Number(data[0][3]);
                      const snow =
                        data[0][4] === '\\N' ? null : Number(data[0][4]);
                      const prcp =
                        data[0][5] === '\\N' ? null : Number(data[0][5]);

                      rs.push(
                        JSON.stringify({
                          zipcode,
                          date,
                          tmax,
                          tmin,
                          snow,
                          prcp,
                        })
                      );
                    }

                    cb();
                  })
                )
              )
              .on('close', () => {
                if (records.length) {
                  putRecordsToDb(records);
                }
              })
              .on('error', error => {
                throw error;
              });
          } else {
            entry.autodrain();
          }
        })
        .on('close', () => {
          resolve();
        })
        .on('error', error => {
          reject(error);
        });
    });

    return Promise.all(promises);
  },

  down: (queryInterface: Sequelize.QueryInterface) =>
    queryInterface.bulkDelete('WeatherRecords', null, {}),
};
