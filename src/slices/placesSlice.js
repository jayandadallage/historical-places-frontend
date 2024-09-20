import { createSlice } from '@reduxjs/toolkit';

const placesSlice = createSlice({
  name: 'places',
  initialState: {
    visited: [],
    suggested: [],
  },
  reducers: {
    setPlaces(state, action) {
      if (action.payload.visited) {
        state.visited = action.payload.visited;
      }
      if (action.payload.suggested) {
        state.suggested = action.payload.suggested;
      }
    },
  },
});

export const { setPlaces } = placesSlice.actions;
export default placesSlice.reducer;
