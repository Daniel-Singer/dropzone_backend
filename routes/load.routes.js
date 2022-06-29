const express = require("express");
const { allLoads, oneLoad, addLoad, deleteLoad } = require("../controllers/load.controllers");
const router = express.Router();

/**
 * @route /api/v1/loads
 */

router.route("/").get(allLoads).post(addLoad);

/**
 * @route /api/v1/loads/:_id
 */

router.route('/:_id').get(oneLoad).delete(deleteLoad);