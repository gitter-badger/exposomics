// @flow

/* eslint react/no-danger:0 */

import React from 'react';
import { node } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { logPageView } from '../redux/api/ga';
import { Style } from '../components';
import { stylesheet } from '../styles/global.scss';

const style = `
#__next {
  overflow-x: hidden;
}
`;

class Layout extends React.PureComponent<{ children: React$Element<any> }> {
  static propTypes = {
    children: node.isRequired,
  };

  componentDidMount() {
    /* global window */
    window.scrollTo(0, 0);
    logPageView();
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />

        <Style stylesheet={stylesheet} />
        {children}
      </div>
    );
  }
}

export default connect(() => ({}), {})(withRouter(Layout));
