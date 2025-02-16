const systemConfig = require('../../config/system');
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const productsCategoryRoutes = require("./products-category.route");
const roleRoutes = require("./role.router");
const accountRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");

module.exports = (app) => {
    PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);
    app.use(PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productsCategoryRoutes);
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
    app.use(PATH_ADMIN + "/auth", authRoutes);
}