import io from 'socket.io-client'
import { store, connectToStore } from 'redux/store'
import { hostNetworkSelector } from 'redux/host-network/host-network-selectors'
import { roomSelector } from 'redux/room/room-selectors'
import { setRoomCode } from 'redux/room/room-actions'
import hostNetworkState from 'redux/host-network/host-network-state'
import {setNetworkState} from 'redux/host-network/host-network-actions'

var host = {};

connectToStore(host, [hostNetworkSelector], {setNetworkState});
connectToStore(host, [roomSelector], {setRoomCode});

//promise template for attempting to connect
//returns a function that needs to be sent to new Promise(), that should be resolved/rejected when the owning socket connects or fails to connects
function connectionPromise(owner) {
  return (resolve, reject) => {
    owner.connectionPromise = {
      resolve,
      reject
    }
  }
}

//connect function, returns a promise
//if connection si successfull and a roomcode is received, then the resolve is called with the roomcode given to it
//if connection or roomcode isn't received then it is marked as rejected
host.connect = function() {

  //not trying to connect, so try to connect and return promise
  if(this.networkState === hostNetworkState.disconnected) {
    
    this.socket.open();
    this.setNetworkState(hostNetworkState.connecting);
    
    let self = this;
    return new Promise(
      (resolve, reject) => {
        self.connectionPromise = {resolve, reject};
      }
    );
  }
  //already connected, return a promise that resolves immediately
  if(this.networkState === hostNetworkState.awaitingPlayers)
    return new Promise((resolve, reject) => resolve(this.roomCode));

  //already connectioning, should have a promise, if not then cry
  // if(this.networkState === hostNetworkState.connecting || this.networkState === hostNetworkState.awaitingRoomcode)
    return this.connectionPromise;
}

host.handleRoomcodeEvent = function(roomCode) {
  this.setNetworkState(hostNetworkState.awaitingPlayers);
  this.setRoomCode(roomCode);
  this.connectionPromise.resolve(roomCode);
}

host.handlePlayerConnection = function(data) {
  this.players.push(data);
}

host.handleConnect = function() {
  this.setNetworkState(hostNetworkState.awaitingRoomcode);
  this.socket.emit('host');
}

host.handleConnectionFailed = function() {
  alert("failed to connect to server.");
  this.connectionPromise.reject();
  this.setNetworkState(hostNetworkState.disconnected);
}

host.handleDisconnect = function() {
  this.setNetworkState(hostNetworkState.disconnected);
}

//can't use point free because of the binding of the 'this'
host.socket.on('connect', () => host.handleConnect());
host.socket.on('roomcode', (roomCode) => host.handleRoomcodeEvent(roomCode));
host.socket.on('playerConnection', (data) => host.handlePlayerConnection(data));
host.socket.on('connect_error', () => host.handleConnectionFailed());
host.socket.on('connect_timeout', () => host.handleConnectionFailed());
host.socket.on('disconnect', () => host.handleDisconnect());

export default host;
