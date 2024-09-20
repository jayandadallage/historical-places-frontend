import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, setLoading } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import your api instance
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './../styles/AuthPage.css'; // Create this CSS file for your background

const AuthTabs = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleAuth = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const endpoint = isLogin ? '/login' : '/register';
    const data = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await api.post(endpoint, data);
      dispatch(loginSuccess(response.data));
      
      if (!isLogin) {
        setAlertMessage(response.data.message); 
        setAlertVisible(true); 
        setIsLogin(true);
      } else {
        navigate('/places'); // Navigate to places on success
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: `url('your-background-image.jpg') no-repeat center center fixed`, backgroundSize: 'cover' }}>
      <div className="card shadow" style={{ width: '400px' }}>
        <div className="card-body">
          <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
          {alertVisible && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {alertMessage}
              <button type="button" className="btn-close" onClick={() => setAlertVisible(false)} aria-label="Close"></button>
            </div>
          )}
          <form onSubmit={handleAuth}>
            {!isLogin && ( // Render name input only for registration
              <div className="mb-3">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  className="form-control"
                />
              </div>
            )}
            <div className="mb-3">
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <div className="text-center mt-3">
            <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;
