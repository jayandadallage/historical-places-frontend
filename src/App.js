// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthTabs from './components/AuthTabs';
import PlaceList from './components/PlaceList';
import PlaceDetail from './components/PlaceDetail'; // Import the new component
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthTabs />} />
        <Route 
          path="/places" 
          element={isAuthenticated ? <PlaceList /> : <Navigate to="/login" />}
        />
        <Route 
          path="/places/:id" 
          element={isAuthenticated ? <PlaceDetail /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
