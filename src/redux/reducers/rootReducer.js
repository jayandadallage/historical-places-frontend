// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust the path as needed
import placeReducer from './placeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  places: placeReducer,
});

export default rootReducer;
