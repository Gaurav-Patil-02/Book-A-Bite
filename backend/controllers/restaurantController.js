const path = require("path");
const Restaurant = require("../models/restaurant");

exports.addRestaurant = async (req, res) => {
  const { name, location, cuisine, tables } = req.body;
  const imageUrl = req.file ? "/uploads/" + req.file.filename : null;

  try {
    const adminId = req.user.userId;
    const parsedTables = tables ? JSON.parse(tables) : [];

    const newRestaurant = new Restaurant({
      name,
      location,
      cuisine,
      tables: parsedTables,
      image: imageUrl,
      admin: adminId,
    });

    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const restaurantsWithImageUrls = restaurants.map((restaurant) => ({
      ...restaurant.toObject(),
      imageUrl: restaurant.image ? `${baseUrl}${restaurant.image}` : null,
    }));

    res.status(200).json(restaurantsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants" });
  }
};


exports.checkAvailability = async (req, res) => {
  const { restaurantId, date, time, numberOfGuests } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const availableTables = restaurant.tables.filter((table) =>
      table.capacity >= numberOfGuests &&
      (!table.reservations ||
        !table.reservations.some(
          (reservation) =>
            reservation.date === date && reservation.time === time
        ))
    );

    res.json(availableTables);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.reserveTable = async (req, res) => {
  const { restaurantId, tableNumber, date, time, numberOfGuests } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const table = restaurant.tables.find((t) => t.tableNumber === tableNumber);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    const isAlreadyReserved = table.reservations.some(
      (reservation) => reservation.date === date && reservation.time === time
    );

    if (isAlreadyReserved) {
      return res.status(400).json({
        message: "Table is already reserved at the selected time.",
      });
    }

    table.reservations.push({ date, time, numberOfGuests });
    await restaurant.save();

    res.status(200).json({ message: "Reservation successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
