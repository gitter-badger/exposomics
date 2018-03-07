// @flow

import React from 'react';
import { Style } from '../';
import { classNames, stylesheet } from './Loader.scss';

export default class extends React.PureComponent<{}> {
  render() {
    return (
      <div className={classNames.Loader}>
        <Style stylesheet={stylesheet} />

        <b>Loading...</b>
      </div>
    );
  }
}
