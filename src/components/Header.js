import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user'); // Assuming user is stored in authSlice

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className="d-flex justify-content-between align-items-center mb-4"
      style={{
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '250px', // Increased height for more visibility
        padding: '20px',
        color: '#000',
        borderBottom: '4px solid #ddd', // Optional border for separation
      }}
    >
      <h1
        className="text-center"
        style={{
          color: '#000',
          fontSize: '2.5rem', // Increased font size
          fontWeight: 'bold', // Bold text for highlighting
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)', // Subtle text shadow for better contrast
        }}
      >
        Explore The World
      </h1>
      <div className="d-flex align-items-center">
        {user && (
          <span
            className="me-4"
            style={{
              color: '#000',
              fontSize: '1.2rem', // Slightly bigger font for the user name
              fontWeight: '500',
              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)', // Subtle text shadow
            }}
          >
            {user}
          </span>
        )}
        <button
          className="btn btn-danger"
          onClick={handleLogout}
          style={{
            fontSize: '1.5rem', // Increased size for icon
            fontWeight: 'bold', // Bold icon for emphasis
            padding: '10px 15px', // Larger button
            borderRadius: '5px', // Rounded edges
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <i className="bi bi-box-arrow-right"></i> {/* Logout Icon */}
        </button>
      </div>
    </header>
  );
};

export default Header;
