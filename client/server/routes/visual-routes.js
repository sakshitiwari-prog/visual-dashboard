const express = require("express");
const visualRouter = express.Router();
const {getAllVisualData} = require("../controllers/visual-controller")
visualRouter.get("/", getAllVisualData);

module.exports = visualRouter;
