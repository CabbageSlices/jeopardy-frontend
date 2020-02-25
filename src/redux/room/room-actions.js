import actionTypes from './action-types'

const setRoomCode = (roomCode) => ({
  type: actionTypes.SET_ROOM_CODE,
  payload: roomCode
});

export { setRoomCode }