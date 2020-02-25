import actionTypes from './action-types'

const setNetworkState = (newState) => ({
  type: actionTypes.SET_NETWORK_STATE,
  payload: newState
});

export { setNetworkState }