import { combineReducers } from 'redux';
import HostNetworkReducer from './host-network/host-network-reducer'
import roomReducer from './room/room-reducer'

const rootReducer = combineReducers({
  hostNetwork: HostNetworkReducer,
  room: roomReducer
});

export default rootReducer;