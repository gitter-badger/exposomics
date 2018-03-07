// @flow

import React from 'react';
import { arrayOf, shape, instanceOf, func } from 'prop-types';
import type { Place } from '../../../flowtype/Place.type';
import { LivePlaceInputGroup, Style } from '../';
// import { classNames as globalClassNames } from '../../styles/global.scss';
import { classNames as cs, stylesheet } from './IndexPage.scss';

type Props = {
  places: Place[],
  onPlacesChange: (Place[]) => void,
  onPlacesSubmit: (Place[]) => void,
};

export default class IndexPage extends React.PureComponent<Props> {
  static propTypes = {
    places: arrayOf(
      shape({
        location: shape(),
        fromDate: instanceOf(Date),
        toDate: instanceOf(Date),
      })
    ).isRequired,
    onPlacesChange: func.isRequired,
    onPlacesSubmit: func.isRequired,
  };

  render() {
    const { places, onPlacesChange, onPlacesSubmit } = this.props;

    return (
      <div
        className={cs.IndexPage}
        style={{ height: '100vh', bottomMargin: 0 }}
      >
        <Style stylesheet={stylesheet} />

        <div>
          <div className="row center-xs">
            <h1 className={cs.introTitle}>The Exposomics Project</h1>
          </div>

          <div className="row center-xs">
            <div className="col-xs-11">
              <p className={cs.subtitle}>
                <i>Our environment impacts our health! </i>
                <br />
                doc.ai&apos;s Exposomics project is part of our Neuron platform,
                helping individuals gain health insights <br />from all their
                omics. Enter the cities you lived in with corresponding dates to
                see your daily <br />Air Quality Index for each of these dates.
                You can enter places of residence dating back to 1980.
                <br />
                <a
                  className={cs.joinChallenge}
                  href="https://doc-ai.github.io/exposomics/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Exposomics Challenge!
                </a>
                <br />
                <b> Currently supports only US</b>
                {/* Submit your zipcode to
              <br />
              Things you are exposed to
              <br />
              Air Quality, Weather, Soil, Water Contamination */}
              </p>
            </div>
          </div>
          <br />
          <div className="row center-xs">
            <div className="col-xs-10">
              <LivePlaceInputGroup
                places={places}
                onChange={v => onPlacesChange(v)}
              />
            </div>
          </div>
        </div>

        <br />
        <div className="row center-xs">
          <div className="col-xs-2">
            <button
              onClick={() => onPlacesSubmit(places)}
              className={cs.submitZone}
              disabled={places.length === 0}
            >
              SUBMIT
            </button>
          </div>
        </div>
        {/* <div className="row center-xs">
          <p className={cs.subtitle}>Currently supports only US </p>
        </div> */}
      </div>
    );
  }
}
