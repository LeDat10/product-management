const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

module.exports.index = async (req, res) => {
    // Lấy sản phẩm nổi bật
    const productsFeatured = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    }).limit(6);

    const newProducts = productHelper.pricenewProducts(productsFeatured);

    // Hết phần lấy sản phẩm nổi bật

    res.render('client/pages/home/index', {
        pageTitle: "Trang chủ",
        productsFeatured: newProducts
    });
};