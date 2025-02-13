const systemConfig = require('../../config/system');

const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const productsCategoryRoutes = require("./products-category.route");
const roleRoutes = require("./role.router");

module.exports = (app) => {
    PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    app.use(PATH_ADMIN + "/products", productRoutes);
    app.use(PATH_ADMIN + "/products-category", productsCategoryRoutes);
    app.use(PATH_ADMIN + "/roles", roleRoutes);
}