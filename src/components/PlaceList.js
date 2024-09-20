import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, toggleVisitedPlace } from '../redux/actions/placeActions';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const PlaceList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const visitedPlaces = useSelector((state) => state.places.visited);
  const suggestedPlaces = useSelector((state) => state.places.suggested);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('suggested');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPlaces(token));
  }, [dispatch, token]);
  
  useEffect(() => {
    dispatch(fetchPlaces(token));
  }, [loading]);

  const handleToggleVisited = (placeId) => {
    dispatch(toggleVisitedPlace(placeId, token));
    dispatch(fetchPlaces(token));
    setLoading(true);
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  const handleSurpriseMe = () => {
    const allPlaces = [...suggestedPlaces, ...visitedPlaces];
    if (allPlaces.length > 0) {
      const randomPlace = allPlaces[Math.floor(Math.random() * allPlaces.length)];
      navigate(`/places/${randomPlace.id}`);
    }
  };

  return (
    <div className="container mt-5">
      <Header />

      <div className="d-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'suggested' ? 'active' : ''}`} onClick={() => setActiveTab('suggested')}>
              All Places
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'visited' ? 'active' : ''}`} onClick={() => setActiveTab('visited')}>
              Visited Places
            </button>
          </li>
        </ul>

        <button 
          className="btn btn-warning rounded-pill shadow" 
          style={{ padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', transition: 'background-color 0.3s' }} 
          onClick={handleSurpriseMe}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFC107'} // Change color on hover
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''} // Reset color on mouse out
        >
          Surprise Me
        </button>
      </div>

      <div className="tab-content mt-3">

        {activeTab === 'suggested' && (
          <div className="tab-pane fade show active">
            <h2>All Places</h2>
            <ul className="list-group">
              {suggestedPlaces.map((place) => (
                <li key={place.id} className="list-group-item position-relative d-flex" onClick={() => handlePlaceClick(place.id)} style={{ cursor: 'pointer' }}>
                  <img 
                    src={place.images[0]?.image_url || ''} 
                    alt={place.name} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }} 
                  />
                  <div className="d-flex flex-column">
                    <h5>{place.name}</h5>
                    <p>{place.description}</p>
                  </div>
                  <button className="btn position-absolute end-0 bottom-0" onClick={(e) => { e.stopPropagation(); handleToggleVisited(place.id); }} style={{ background: 'transparent', border: 'none' }}>
                    <i className={`bi ${visitedPlaces.some((visited) => visited.id === place.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'visited' && (
          <div className="tab-pane fade show active">
            <h2>Visited Places</h2>
            <ul className="list-group mb-4">
              {visitedPlaces.length > 0 ? (
                visitedPlaces.map((place) => (
                  <li key={place.id} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handlePlaceClick(place.id)} style={{ cursor: 'pointer' }}>
                    <div className="d-flex">
                      <img 
                        src={place.image_urls[0] || ''}  
                        alt={place.name} 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }} 
                      />
                      <div className="d-flex flex-column">
                        <h5>{place.name}</h5>
                        <p>{place.description}</p>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-link text-danger" onClick={(e) => { e.stopPropagation(); handleToggleVisited(place.id); }} style={{ padding: 0 }}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">
                  <p className="text-center">You have not visited any places yet.</p>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceList;
