const express = require("express");
const { allLoads } = require("../controllers/load.controllers");
const router = express.Router();

/**
 * @route /api/v1/loads
 */

router.route("/").get(allLoads);
