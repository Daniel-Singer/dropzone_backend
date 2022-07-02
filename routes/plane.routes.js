const express = require("express");
const {
  allPlanes,
  addPlane,
  updatePlane,
  deletePlane,
} = require("../controllers/plane.controllers");
const { admin, protect } = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * @route /api/v1/planes
 */

router.route("/").get(allPlanes).post(addPlane);

/**
 * @route /api/v1/planes/:_id
 */

router
  .route("/:_id")
  .put(protect, admin, updatePlane)
  .delete(protect, admin, deletePlane);

module.exports = router;
