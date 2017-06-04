import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  networkState: true,
  spinnerVisible: false,
  radios: [],
  genres: [],
  locations: [],
  detail: null,
  radioId: -1,
});
const networkState = (state, action) => ({
  ...state,
  networkState: action.networkState,
});
const spinnerVisible = (state, action) => ({
  ...state,
  spinnerVisible: action.spinnerVisible,
});
const setRadios = (state, action) => ({
  ...state,
  radios: action.radios,
});
const setGenres = (state, action) => ({
  ...state,
  genres: action.genres,
});
const setLocations = (state, action) => ({
  ...state,
  genres: action.locations,
});
const setDetail = (state, action) => ({
  ...state,
  detail: action.detail,
});
const setRadioId = (state, action) => ({
  ...state,
  radioId: action.radioId,
});
const actionHandlers = {
  [Types.SET_NETWORK_STATE]: networkState,
  [Types.SET_SPINNER_VISIBLE]: spinnerVisible,
  [Types.SET_RADIOS]: setRadios,
  [Types.SET_GENRES]: setGenres,
  [Types.SET_LOCATIONS]: setLocations,
  [Types.SET_DETAIL]: setDetail,
  [Types.SET_RADIO_ID]: setRadioId,
};
export default createReducer(initialState, actionHandlers);
