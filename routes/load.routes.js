const express = require("express");
const { allLoads, oneLoad, addLoad, deleteLoad } = require("../controllers/load.controllers");
const { loadsByDate } = require("../middleware/load.middleware");
const router = express.Router();

/**
 * @route /api/v1/loads
 */

router.route("/").get(loadsByDate, allLoads).post(addLoad);

/**
 * @route /api/v1/loads/:_id
 */

router.route('/:_id').get(oneLoad).delete(deleteLoad);

module.exports = router;