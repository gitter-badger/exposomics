// @flow

import AirQualityTabView from './AirQualityTabView';
import TempHighTabView from './TempHighTabView';
import TempLowTabView from './TempLowTabView';
import PrecipitationTabView from './PrecipitationTabView';
import SnowTabView from './SnowTabView';

export default [
  { id: 'airQuality', name: 'Air Quality', View: AirQualityTabView },
  { id: 'tempHigh', name: 'Temp High', View: TempHighTabView },
  { id: 'tempLow', name: 'Temp Low', View: TempLowTabView },
  { id: 'precipitation', name: 'Precipitation', View: PrecipitationTabView },
  { id: 'snow', name: 'Snow', View: SnowTabView },
];
