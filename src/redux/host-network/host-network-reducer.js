import networkState from './host-network-state'
import io from 'socket.io-client'
import actionTypes from './action-types'

const BACKEND_ADDRESS = 'https://jeopardy-garbage.herokuapp.com/';
// const BACKEND_ADDRESS = 'http://localhost:4000/';

const INITIAL_STATE = {
  networkState: networkState.disconnected,
  backendAddress: BACKEND_ADDRESS,
  socket: io(BACKEND_ADDRESS, {autoConnect: false, reconnection: false, timeout: 10000}),
}

const HostNetworkReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
  
    case actionTypes.SET_NETWORK_STATE:
      return {
      ...state,
      networkState: action.payload
    }

    default:
      return state;
  }
}

export default HostNetworkReducer;