const express = require("express");
const {
  allSkydivers,
  addSkydiver,
  oneSkydiver,
  updateSkydiver,
  auth,
  deleteSkydiver,
} = require("../controllers/skydiver.controllers");
const { filterByRole } = require("../middleware/skydiver.middleware");
const { protect, admin } = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * @route /api/v1/skydivers
 */

router.route("/").get(filterByRole, allSkydivers).post(addSkydiver);

/**
 * @route /api/v1/skydivers/:_id
 */

router
  .route("/:_id")
  .get(oneSkydiver)
  .put(updateSkydiver)
  .delete(protect, admin, deleteSkydiver);

/**
 * @route /api/v1/skydivers/login
 */

router.route("/login").post(auth);

module.exports = router;
