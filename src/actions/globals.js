import Types from './actionTypes';

export const setNetworkState = networkState =>
  ({ type: Types.SET_NETWORK_STATE, networkState });
export const setSpinnerVisible = spinnerVisible =>
  ({ type: Types.SET_SPINNER_VISIBLE, spinnerVisible });