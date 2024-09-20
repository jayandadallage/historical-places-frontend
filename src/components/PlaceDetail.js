import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisitedPlace } from '../redux/actions/placeActions'; // Redux action to toggle place visited

const PlaceDetail = () => {
  const token = useSelector((state) => state.auth.token);
  const visitedPlaces = useSelector((state) => state.places.visited); // Get visited places from Redux state
  const dispatch = useDispatch();
  
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the currently selected large image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisited, setIsVisited] = useState(false); // Local state to track if the place is visited

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const response = await api.get(`/places/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setPlace(response.data);
        setSelectedImage(response.data.images[0].image_url); // Set the first image as the default large image

        // Check if the current place is visited
        const visited = visitedPlaces.some((visitedPlace) => visitedPlace.id === response.data.id);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [id, token, visitedPlaces]);

  const handleToggleVisited = () => {
    setIsVisited(!isVisited);
    dispatch(toggleVisitedPlace(id, token));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching place details: {error.message}</div>;

  return (
    <div className="container mt-5">
      <Header /> {/* Include the Header component */}
      {place && (
        <div className="card">
          <div className="row no-gutters position-relative">
            {/* Large image */}
            <div className="col-12 mb-4 position-relative">
              <img
                src={selectedImage}
                alt={place.name}
                className="img-fluid w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />

              {/* Heart button for toggling visited status */}
              <button
                className="btn position-absolute end-0 bottom-0 m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleVisited(); // Toggle visited status when clicked
                }}
                style={{ background: 'transparent', border: 'none' }}
              >
                <i
                  className={`bi ${isVisited ? 'bi-heart-fill' : 'bi-heart'}`}
                  style={{ color: isVisited ? 'red' : 'gray', fontSize: '1.5rem' }}
                ></i>
              </button>
            </div>

            {/* Thumbnails including the first image */}
            <div className="col-12 mb-4 d-flex flex-wrap">
              {place.images.map((image, index) => (
                <div key={index} className="p-1">
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setSelectedImage(image.image_url)} // Set clicked image as large image
                  />
                </div>
              ))}
            </div>

            {/* Place details */}
            <div className="col-12">
              <div className="card-body">
                <h5 className="card-title">{place.name}</h5>
                <p className="card-text">{place.description}</p>
                {/* Add more details here as needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetail;
