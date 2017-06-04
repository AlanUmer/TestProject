import Types from './actionTypes';

export const setNetworkState = networkState =>
  ({ type: Types.SET_NETWORK_STATE, networkState });
export const setSpinnerVisible = spinnerVisible =>
  ({ type: Types.SET_SPINNER_VISIBLE, spinnerVisible });
export const setRadios = radios =>
  ({ type: Types.SET_RADIOS, radios });
export const setLocations = locations =>
  ({ type: Types.SET_LOCATION, locations });
export const setGenres = genres =>
  ({ type: Types.SET_GENRES, genres });
export const setDetail = detail =>
  ({ type: Types.SET_DETAIL, detail });
export const setRadioId = radioId =>
  ({ type: Types.SET_RADIO_ID, radioId });


