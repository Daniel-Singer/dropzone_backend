const express = require("express");
const {
  allSkydivers,
  addSkydiver,
  oneSkydiver,
} = require("../controllers/skydiver.controllers");
const router = express.Router();

/**
 * @route /api/v1/skydivers
 */

router.route("/").get(allSkydivers).post(addSkydiver);

/**
 * @route /api/v1/skydivers/:_id
 */

router.route('/:_id').get(oneSkydiver);

module.exports = router;
