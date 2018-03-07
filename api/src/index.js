// @flow

/* eslint no-console:0 */

import Koa, { type Context } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import { BadRequest } from 'http-errors';
import moment from 'moment';
import ExposomicsLocationManager from '@doc.ai/exposomics-common/lib/utils/ExposomicsLocationManager';
import config from './config';
import './db';
import dataControllers from './dataControllers';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/ping', async (ctx: Context) => {
  ctx.body = { success: true };
});

router.post('/places', async (ctx: Context) => {
  const { request: { body } } = ctx;

  const places = body.places.map((place, idx) => {
    const result = {};

    ['location', 'fromDate', 'toDate'].forEach(key => {
      if (!place[key]) {
        throw new BadRequest(`No ${key} is provided for place ${idx}`);
      }
    });

    // TODO: convert location to Location class and use the same also on frontend
    result.location = place.location;

    ['fromDate', 'toDate'].forEach(key => {
      try {
        result[key] = moment(new Date(place[key]));
      } catch (e) {
        throw new BadRequest(
          `Wrong ${key} is provided for place ${idx}. Expected ISO-8601 formatted string.`
        );
      }
    });

    if (result.toDate.isBefore(result.fromDate)) {
      throw new BadRequest(
        `Wrong fromDate is provided for place ${idx}. It cannot be before toDate.`
      );
    }

    // TODO: some more checks

    return result;
  });

  if (!places.length) {
    throw new BadRequest('Please provide at least one place where you lived');
  }

  // Create the location manager with the list of places.
  const locationManager = new ExposomicsLocationManager(places);

  const results = {};
  await Promise.all(
    dataControllers.map(async dataController => {
      const controllerResults = await dataController(locationManager);
      Object.keys(controllerResults).forEach(name => {
        results[name] = controllerResults[name];
      });
    })
  );

  ctx.body = {
    results,
    startDate: locationManager.getStartDate(),
    endDate: locationManager.getEndDate(),
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port);
console.log(`> Ready on http://localhost:${config.port}`);
