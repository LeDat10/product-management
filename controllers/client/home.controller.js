const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

module.exports.index = async (req, res) => {
    // Lấy sản phẩm nổi bật
    const productsFeatured = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    }).limit(6).sort({
        position: "desc"
    });

    const newProductsFeatured = productHelper.pricenewProducts(productsFeatured);

    // Hết phần lấy sản phẩm nổi bật

    // Lấy sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).limit(6).sort({ position: "desc" });

    const newProductsNew = productHelper.pricenewProducts(productsNew);
    // Hết phần lấy sản phẩm mới nhất

    res.render('client/pages/home/index', {
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
};