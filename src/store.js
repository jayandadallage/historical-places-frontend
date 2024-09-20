import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import placesReducer from './redux/reducers/placeReducer';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './redux/reducers/rootReducer'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placesReducer,
  },
});

export default store;
