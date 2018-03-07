// @flow

export const BASE_YEAR = 1895;
export const YEARS_PER_PAGE = 12;

export default (page: number = 1): number[] => {
  if (page < 1) {
    page = 1;
  }

  const startYear = BASE_YEAR + YEARS_PER_PAGE * (page - 1);

  const result = [];
  for (let i = 1; i <= YEARS_PER_PAGE; i += 1) {
    result.push(startYear + i - 1);
  }

  return result;
};
