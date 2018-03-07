// @flow

import axios from 'axios';

const PLACES_CHANGE = 'exposomics/PLACES_CHANGE';
const PLACES_SUBMIT = 'exposomics/PLACES_SUBMIT';
const PLACES_SUBMIT_SUCCESS = 'exposomics/PLACES_SUBMIT_SUCCESS';
const PLACES_SUBMIT_FAIL = 'exposomics/PLACES_SUBMIT_FAIL';

const defaultState = {
  places: [],
  results: {
    isLoading: false,
    isLoaded: false,
    error: null,
    data: {},
  },
};

export default function(state: Object = defaultState, action: Object) {
  switch (action.type) {
    case PLACES_CHANGE: {
      return { ...state, places: action.places };
    }
    case PLACES_SUBMIT: {
      return {
        ...state,
        results: { ...defaultState.results, isLoading: true },
      };
    }
    case PLACES_SUBMIT_SUCCESS: {
      return {
        ...state,
        results: {
          ...state.results,
          isLoading: false,
          isLoaded: true,
          data: action.result,
        },
      };
    }
    case PLACES_SUBMIT_FAIL: {
      return {
        ...state,
        results: { ...state.results, isLoading: false, error: action.error },
      };
    }
    default: {
      return state;
    }
  }
}

export function change(places: Object[]) {
  return {
    type: PLACES_CHANGE,
    places,
  };
}

export function submit(places: Object[]) {
  return async (dispatch: Object => Promise<any>) => {
    await dispatch({ type: PLACES_SUBMIT, places });

    try {
      const res = await axios.post('/api/places', { places });
      await dispatch({ type: PLACES_SUBMIT_SUCCESS, result: res.data });
    } catch (error) {
      await dispatch({ type: PLACES_SUBMIT_FAIL, error });
      alert(error.response.data.message); // eslint-disable-line
    }
  };
}
