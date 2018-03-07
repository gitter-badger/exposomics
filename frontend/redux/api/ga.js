// @flow

import ReactGA from 'react-ga';

let isInited = false;

function initGA() {
  if (isInited || !window) {
    return;
  }
  isInited = true;
  ReactGA.initialize('UA-90008745-7');
}

export function logPageView() {
  if (!window) {
    return;
  }
  initGA();
  /* global window */

  try {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  } catch (e) {
    console.log('ga error', e); // eslint-disable-line no-console
  }
}

export function logEvent(category: string, action: string) {
  initGA();
  try {
    ReactGA.event({
      category,
      action,
    });
  } catch (e) {
    console.log('ga error', e); // eslint-disable-line no-console
  }
}

export function logButtonClick(name: string) {
  initGA();
  try {
    ReactGA.ga('send', 'event', 'button', 'click', name);
  } catch (e) {
    console.log('ga error', e); // eslint-disable-line no-console
  }
}

export default ReactGA;
