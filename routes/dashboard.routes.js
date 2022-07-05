const express = require("express");
const { allData } = require("../controllers/dashboard.controllers");
const { protect } = require("../middleware/auth.middleware");
const { getTodaysData } = require("../middleware/dashboard.middleware");

const router = express.Router();

/**
 * @route /api/v1/dashboard
 */

router.route("/").get(protect, getTodaysData, allData);

module.exports = router;
