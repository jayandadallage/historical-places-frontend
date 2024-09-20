import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  user: null, // Add user to the initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Store user information
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', action.payload.user.name);
    },
    logout(state) {
      state.token = null;
      state.user = null; // Clear user on logout
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('user');
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
