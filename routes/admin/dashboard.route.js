const controller = require('../../controllers/admin/dashboard.controller');
const express = require('express');
const route = express.Router();

route.get('/', controller.dashboard);
module.exports = route;