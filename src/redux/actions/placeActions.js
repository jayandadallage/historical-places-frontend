// src/redux/actions/placeActions.js
import api from '../../api';
// import { SET_PLACES, TOGGLE_VISITED_PLACE, FETCH_PLACES_SUCCESS } from './actionTypes'; // Import action types
import * as Types from './actionTypes';


// Action to fetch places
export const fetchPlaces = (token) => async (dispatch) => {
  try {
    const [visitedResponse, suggestedResponse] = await Promise.all([
      api.get('/places/visited', { headers: { Authorization: `Bearer ${token}` } }),
      api.get('/places', { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    dispatch({
        type: Types.SET_PLACES,
        payload: { suggested: suggestedResponse.data,visited: visitedResponse.data  }
      });
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

// Action to set places in the Redux store
export const setPlaces = (places) => ({
  type: Types.SET_PLACES,
  payload: places,
});

// Action to toggle visited status of a place
export const toggleVisitedPlace = (placeId, token) => async (dispatch) => {
  try {
    const response = await api.post(`/places/${placeId}/toggle-visited/`, {}, { 
      headers: { 
        Authorization: `Bearer ${token}` 
      } 
    });
    dispatch({ type: Types.TOGGLE_VISITED_PLACE, payload: placeId }); 
    return response;// Ensure this matches your reducer case
  } catch (error) {
    console.error('Error toggling visited place:', error);
  }
};
