const express = require("express");
const multer = require("multer");
const path = require("path");
const { addRestaurant, getAllRestaurants, checkAvailability, reserveTable } =
  require("../controllers/restaurantController.js");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


router.post("/add", authMiddleware, roleMiddleware("admin"), upload.single("image"), addRestaurant);
router.get("/", getAllRestaurants);
router.post("/check-availability", checkAvailability);
router.post("/reserve-table", reserveTable);

module.exports = router;
