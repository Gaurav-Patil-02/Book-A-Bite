import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); 

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants'); 
        setRestaurants(response.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };

    fetchRestaurants();
  }, []);

  const handleBookTable = (restaurantId) => {
    if (isAuthenticated) {
      navigate(`/reservation/${restaurantId}`); 
    } else {
    
      navigate('/login');
    }
  };

  return (
    <div className="restaurant-list-container">
      <h2 className="restaurant-list-title">Explore Our Restaurants</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-card">
            <img
              src={restaurant.imageUrl || '/placeholder.jpg'}
              alt={restaurant.name}
              className="restaurant-card-image"
            />
            <div className="restaurant-card-content">
              <h3 className="restaurant-card-title">{restaurant.name}</h3>
              <p className="restaurant-card-location">
                <strong>Location:</strong> {restaurant.location}
              </p>
              <p className="restaurant-card-cuisine">
                <strong>Cuisine:</strong> {restaurant.cuisine}
              </p>
              <button
                className="book-table-button"
                onClick={() => handleBookTable(restaurant._id)} 
              >
                {isAuthenticated ? 'Book Table' : 'Login to Book'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
