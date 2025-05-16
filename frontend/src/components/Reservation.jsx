import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TableSelection from "./TableSelection";

const Reservation = () => {
  const { restaurantId } = useParams(); 

  return (
    <div>
     
      <TableSelection selectedRestaurant={restaurantId} />
    </div>
  );
};

export default Reservation;
