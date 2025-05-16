import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantList from "./components/RestaurantList";
import AddRestaurant from "./components/AddRestaurant";
import RoleRoute from "./utils/RoleRoute";
import Reservation from "./components/Reservation";

function App() {
  const location = useLocation();

 
  const navbarPaths = ["/", "/Home"];
  const showNavbar = navbarPaths.includes(location.pathname);

  return (
    <div className="container">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/restaurants"
          element={
            <RoleRoute role="customer">
              <RestaurantList />
            </RoleRoute>
          }
        />
        <Route
          path="/add-restaurant"
          element={
            <RoleRoute role="admin">
              <AddRestaurant />
            </RoleRoute>
          }
        />
        <Route path="/reservation/:restaurantId" element={<Reservation />} />
      </Routes>
    </div>
  );
}

export default App;
