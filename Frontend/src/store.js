import { createStore, combineReducers } from 'redux';
import reducers from './Reducers';
// import throttle from 'lodash/throttle';

//load persisted state here

//const persistedState = loadState();

export default function configureStore() {
  const str =  createStore(
    combineReducers({
      ...reducers
    }),
   // persistedState
  );
return str
}