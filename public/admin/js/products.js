// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    // console.log(path);

    buttonChangeStatus.forEach(item => {
        item.addEventListener('click', () => {
            const statusCurrent = item.getAttribute("data-status");
            const id = item.getAttribute("data-id");
            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            // console.log(statusCurrent, id);

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            // console.log(action);
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    })
}
// End change status

// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener('click', () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
                
            };
        });
    });
};
// End Delete Item