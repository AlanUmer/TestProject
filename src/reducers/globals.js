import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  networkState: true,
  spinnerVisible: false,
});
const networkState = (state, action) => ({
  ...state,
  networkState: action.networkState,
});
const spinnerVisible = (state, action) => ({
  ...state,
  spinnerVisible: action.spinnerVisible,
});
const actionHandlers = {
  [Types.SET_NETWORK_STATE]: networkState,
  [Types.SET_SPINNER_VISIBLE]: spinnerVisible,
};
export default createReducer(initialState, actionHandlers);
