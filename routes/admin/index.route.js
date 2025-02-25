const systemConfig = require('../../config/system');
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route');
const productsCategoryRoutes = require("./products-category.route");
const roleRoutes = require("./role.router");
const accountRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");
const myAccountRoutes = require("./my-account.route");
const settingRoutes = require("./setting.route");

const authController = require("../../controllers/admin/auth.controller");

module.exports = (app) => {
    PATH_ADMIN = systemConfig.prefixAdmin;

    app.get(PATH_ADMIN + '/', authController.login);
    

    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);
    app.use(PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productsCategoryRoutes);
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
    app.use(PATH_ADMIN + "/auth", authRoutes);
    app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRoutes);
    app.use(PATH_ADMIN + "/settings", authMiddleware.requireAuth, settingRoutes);
}