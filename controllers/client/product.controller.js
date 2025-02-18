const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productHelper = require("../../helpers/product");
const productCategoryHelper = require("../../helpers/product-category");


// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newProduct = productHelper.pricenewProducts(products);

    // console.log(products);
    res.render('client/pages/products/index', {
        pageTitle: "Trang sản phẩm",
        products: newProduct,
    });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }

        const product = await Product.findOne(find);
        // console.log(product);
        res.render('client/pages/products/detail', {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect('/products');
    }
};

// [GET] /:slugCategory
module.exports.category = async (req, res) => {
    const slug = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });

    const listSubCategory = await productCategoryHelper.getSubCategory(category.id);

    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
        deleted: false,
        status: "active"
    }).sort({ position: "desc" });

    const newProducts = productHelper.pricenewProducts(products);

    res.render('client/pages/products/index', {
        pageTitle: category.title,
        products: newProducts,
    });
}