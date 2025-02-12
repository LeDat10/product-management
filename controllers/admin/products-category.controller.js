const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);


    res.render("admin/pages/products-category/index", {
        titlePage: "Danh mục sản phẩm",
        records: newRecords
    });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    };

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/create", {
        titlePage: "Tạo danh mục sản phẩm",
        records: newRecords
    });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position === "") {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const id = req.params.id;
    
    const record = await ProductCategory.findOne({
        _id: id,
        deleted: false
    });


    const find = {
        deleted: false
    };

    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/edit", {
        titlePage: "Chỉnh sửa danh mục sản phẩm",
        record: record,
        records: newRecords
    });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }

    
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    try {
        await ProductCategory.updateOne({_id: id}, req.body);
    } catch (error) {
        
    }

    res.redirect("back");
}