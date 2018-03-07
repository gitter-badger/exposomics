// @flow

import React from 'react';
import withRedux from 'next-redux-wrapper';
import { withRouter } from 'next/router';
import store from '../redux/store';
import { change as onPlacesChange } from '../redux/modules/exposomics';
import { ResultsPage } from '../components';
import Layout from './_layout';

export default withRedux(
  store,
  state => ({
    places: state.exposomics.places,
    results: state.exposomics.results,
  }),
  { onPlacesChange }
)(
  withRouter(props => {
    if (!props.results.isLoaded) {
      props.router.push('/');
      return null;
    }

    return (
      <Layout>
        <ResultsPage {...props} results={props.results.data} />
      </Layout>
    );
  })
);
