// @flow

import { BASE_YEAR, YEARS_PER_PAGE } from './getYearsPage';
import prepareMoment from './prepareMoment';

export default (date: Date) =>
  Math.floor((prepareMoment(date).year() - BASE_YEAR) / YEARS_PER_PAGE) + 1;
