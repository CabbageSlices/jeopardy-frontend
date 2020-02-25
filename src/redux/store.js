import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const store = createStore(rootReducer, applyMiddleware(logger));

const getObjectState = (state, selectors) => selectors.reduce(
    (accum, currentSelector) => ({...accum, ...currentSelector(state)}),
  {})

const applyStateToObject = (state, object) => {
  let keys = Object.keys(state);
  
  keys.forEach(key => {
    object[key] = state[key];
  });
}
const onStoreUpdate = (object, selectors) => {
  let state = store.getState();

  const updatedState = getObjectState(state, selectors);
  applyStateToObject(updatedState, object);
}

const addActionsToObject = (object, actions) => {
  let actionNames = Object.keys(actions);
  actionNames.forEach(name => {
    let func = actions[name];
    object[name] = (payload) => store.dispatch(func(payload));
  })
}

const connectToStore = (object, selectors = [], actions = {}) => {

  const state = store.getState();
  const initialState = getObjectState(state, selectors);

  applyStateToObject(initialState, object);
  
  addActionsToObject(object, actions)
  store.subscribe( () => onStoreUpdate(object, selectors));
  
}

export { store, connectToStore };