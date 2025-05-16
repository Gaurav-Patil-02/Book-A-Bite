const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  tables: [
    {
      tableNumber: {
        type: Number,
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      reservations: [
        {
          date: {
            type: String,
            required: true,
          },
          time: {
            type: String,
            required: true,
          },
          numberOfGuests: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
  image: {
    type: String, 
  },
  admin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
