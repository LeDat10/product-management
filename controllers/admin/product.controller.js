const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);

    // console.log(req.query.status);
    let find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }



    // pagination
    const countProducts = await Product.countDocuments(find);
    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 5
        },
        req.query,
        countProducts
    )
    // End Pagination


    // Sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    // End Sort

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort(sort);

    for (const product of products) {
        const user = await Account.findOne({
            _id: product.createdBy.account_id
        });

        if(user) {
            product.accountFullName = user.fullName;
        }
    };

    res.render("admin/pages/products/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
    res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", `Cập nhật thành công trạng thái ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", `Cập nhật thành công trạng thái ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date()
            });

            req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
            break
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, {
                    position: position
                });
            }
            req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm!`);
            break
        default:
            break;
    }
    res.redirect("back");
}


// [DELETE] /admin/products/delete/:id
// Xóa cứng
// module.exports.deleteItem = async(req, res) => {
//     console.log(req.params);
//     const id =req.params.id;
//     console.log(id);
//     await Product.deleteOne({_id:id});
//     res.redirect("back");
// }

// Xóa mềm
module.exports.deleteItem = async (req, res) => {
    // console.log(req.params);
    const id = req.params.id;
    // console.log(id);
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    req.flash("success", `Xóa thành công 1 sản phẩm!`);
    res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false,
    };

    const category = await ProductCategory.find(find);
    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/create", {
        titlePage: "Thêm mới sản phẩm",
        category: newCategory
    });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position === "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    req.body.createdBy = {
        account_id: res.locals.user.id
    };

    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);
    
        const category = await ProductCategory.find({
            deleted: false
        });
        const newCategory = createTreeHelper.tree(category);

        // console.log(product);
        res.render("admin/pages/products/edit", {
            titlePage: "Chỉnh sửa sản phẩm",
            product: product,
            category: newCategory
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    try {
        await Product.updateOne({ _id: req.params.id }, req.body);
        req.flash("success", "Cập nhật thành công!");

    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    }
    res.redirect(`back`);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);
        // console.log(product);
        res.render("admin/pages/products/detail", {
            titlePage: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}