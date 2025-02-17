const Account = require("../../models/accounts.model");


const md5 = require("md5");


// [GET] /admin/my-account
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index", {
        titlePage: "Thông tin cá nhân"
    });
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit", {
        titlePage: "Chỉnh sửa thông tin cá nhân"
    });
};

// [GET] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;

    if (req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }

    const emailExist = await Account.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    });

    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    } else {
        await Account.updateOne({ _id:id }, req.body);
        req.flash("success", "Cập nhật thành công!");
    }
    res.redirect("back");
};