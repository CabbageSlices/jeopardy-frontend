import actionTypes from './action-types'

const INITIAL_STATE = {
  roomCode: '',
}

const RoomReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
  
    case actionTypes.SET_ROOM_CODE:
      return {
      ...state,
      roomCode: action.payload
    }

    default:
      return state;
  }
}

export default RoomReducer;