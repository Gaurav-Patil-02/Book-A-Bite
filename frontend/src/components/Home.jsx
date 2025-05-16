import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fade, setFade] = useState(true); 
  const navigate = useNavigate();

  const slides = [
    {
      image: '/foodiesfeed.com_bowl-of-ice-cream-with-chocolate.jpg',
      title: 'Savor the Sweetness',
      subtitle: 'Indulge in the finest desserts crafted with love.',
    },
    {
      image: '/foodiesfeed.com_burger-with-melted-cheese.jpg',
      title: 'Bite into Happiness',
      subtitle: 'Juicy, cheesy, and oh-so-satisfying burgers!',
    },
    {
      image: '/foodiesfeed.com_coffee-espresso-on-a-wooden-table.jpg',
      title: 'A Perfect Brew Awaits',
      subtitle: 'Start your day with a cup of perfection.',
    },
    {
      image: '/foodiesfeed.com_healthy-food.jpg',
      title: 'Healthy and Delicious',
      subtitle: 'Nutritious meals to fuel your journey.',
    },
    {
      image: '/foodiesfeed.com_steakhouse-table-situation.jpg',
      title: 'Experience Fine Dining',
      subtitle: 'Where taste meets elegance.',
    },
    {
      image: '/restro.jpg',
      title: 'Reserve Your Table Today',
      subtitle: 'Fine dining experiences await you!',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrentIndex(nextIndex); 
        setNextIndex((nextIndex + 1) % slides.length); 
        setFade(true); 
      }, 1000); 
       }, 5000); 

    return () => clearInterval(interval);
  }, [nextIndex, slides.length]);

  const handleOnClick = () => {
    navigate('/restaurants');
  };

  return (
    <div className="slideshow-container">
      
      <div
        className={`bg-img bg-img-current ${fade ? 'fade-in' : 'fade-out'}`}
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      ></div>
      <div
        className={`bg-img bg-img-next ${fade ? 'fade-out' : 'fade-in'}`}
        style={{ backgroundImage: `url(${slides[nextIndex].image})` }}
      ></div>

      
      <div className="overlay">
        <div className={`dialogue-content ${fade ? 'fade-in' : 'fade-out'}`}>
          <h1 className="home-title">{slides[currentIndex].title}</h1>
          <p className="home-subtitle">{slides[currentIndex].subtitle}</p>
          <button className="res-btn" onClick={handleOnClick}>
            Find Restaurants Near You
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
