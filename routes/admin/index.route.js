const systemConfig = require('../../config/system');

const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const productsCategoryRoutes = require("./products-category.route");
const roleRoutes = require("./role.router");
const accountRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
    PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productRoutes);
    app.use(PATH_ADMIN + "/products-category", productsCategoryRoutes);
    app.use(PATH_ADMIN + "/roles", roleRoutes);
    app.use(PATH_ADMIN + "/accounts", accountRoutes);
    app.use(PATH_ADMIN + "/auth", authRoutes);
}