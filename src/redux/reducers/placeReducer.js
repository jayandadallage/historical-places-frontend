// src/redux/reducers/placeReducer.js
import * as Types from '../actions/actionTypes';

const initialState = {
    suggested: [],
    visited: [],    
};

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
      case Types.SET_PLACES:
        return {
          ...state,
          visited: action.payload.visited,
          suggested: action.payload.suggested,
        };
      case Types.TOGGLE_VISITED_PLACE:
        const placeId = action.payload;
        const isVisited = state.visited.some((place) => place.id === placeId);
  
        return {
          ...state,
          visited: isVisited
            ? state.visited.filter((place) => place.id !== placeId)
            : [...state.visited, { id: placeId }], // Add more properties if needed
        };
      default:
        return state;
    }
  };

export default placeReducer;
