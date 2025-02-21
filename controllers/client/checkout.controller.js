const Cart = require("../../models/carts.model");
const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");


// [GET] /checkout
module.exports.index = async (req, res) => {

    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId
            });
            productInfo.priceNew = productHelper.pricenewProduct(productInfo);

            item.productInfo = productInfo;

            item.totalPrice = item.quantity * productInfo.priceNew;
        };
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum = sum + item.totalPrice, 0);

    res.render("client/pages/checkout/index", {
        titlePage: "Đặt hàng",
        cartDetail: cart
    });
};