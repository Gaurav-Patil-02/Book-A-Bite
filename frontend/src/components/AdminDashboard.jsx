import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/restaurants/admin', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1>My Restaurants</h1>
            {restaurants.map((restaurant) => (
                <div key={restaurant._id}>
                    <h2>{restaurant.name}</h2>
                    <p>Location: {restaurant.location}</p>
                    <p>Cuisine: {restaurant.cuisine}</p>
                    {restaurant.imageUrl && <img src={restaurant.imageUrl} alt={restaurant.name} />}
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;
