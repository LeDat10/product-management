const express = require('express');
const route = express.Router();

const controller = require('../../controllers/admin/dashboard.controller');
const authMiddleware = require("../../middlewares/admin/auth.middleware");

route.get('/',
    controller.dashboard
);

module.exports = route;