// @flow

import React from 'react';
import withRedux from 'next-redux-wrapper';
import { withRouter } from 'next/router';
import store from '../redux/store';
import { change, submit } from '../redux/modules/exposomics';
import { IndexPage, Loader } from '../components';
import Layout from './_layout';

export default withRedux(
  store,
  state => ({
    places: state.exposomics.places,
    results: state.exposomics.results,
  }),
  { onPlacesChange: change, onPlacesSubmit: submit }
)(
  withRouter(props => {
    if (props.results.isLoaded) {
      props.router.push('/results');
    }

    return (
      <Layout>
        {(props.results.isLoading || props.results.isLoaded) && <Loader />}

        <IndexPage {...props} />
      </Layout>
    );
  })
);
