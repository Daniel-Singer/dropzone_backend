const express = require("express");
const {
  allSkydivers,
  addSkydiver,
  oneSkydiver,
  updateSkydiver,
  auth,
} = require("../controllers/skydiver.controllers");
const router = express.Router();

/**
 * @route /api/v1/skydivers
 */

router.route("/").get(allSkydivers).post(addSkydiver);

/**
 * @route /api/v1/skydivers/:_id
 */

router.route('/:_id').get(oneSkydiver).put(updateSkydiver);

/**
 * @route /api/v1/skydivers/login
 */

router.route('/login').post(auth);

module.exports = router;
