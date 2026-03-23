const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));

    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);

    const allSelect = dataForm.getElementsByTagName('select');

    for (const item of dataForm.elements) {
        if (item.tagName === "SELECT") {
            setSortSelect(head, item);
        }
    }

    for (let i = 1; i < allSelect.length; i++) {
        allSelect[i].disabled = true;
    }
}

const updateSelectOptions = (targetSelectId, sourceSelects) => {

    const target = document.getElementById(targetSelectId);

    target.disabled = false;

    const baseSelect = document.getElementById("fieldsFirst");

    target.innerHTML = baseSelect.innerHTML;

    sourceSelects.forEach(select => {
        const value = select.value;
        if (value != 0) {
            target.querySelector(`option[value="${value}"]`)?.remove();
        }
    });

    if (sourceSelects[sourceSelects.length - 1].value == 0) {
        target.disabled = true;
    }
};

document.addEventListener("DOMContentLoaded", function () {

    createTable(buildings, "list");

    const form = document.getElementById("filterForm");
    const btn = document.getElementById("find");

    btn.addEventListener("click", function () {
        filterTable(buildings, "list", form);
        
        resetSort("list", "sort");

        filterTable(buildings, "list", form);
    });

    const sortForm = document.getElementById("sort");

    setSortSelects(buildings[0], sortForm);

    const firstSelect = document.getElementById("fieldsFirst");
    const secondSelect = document.getElementById("fieldsSecond");

    const thirdSelect = document.getElementById("fieldsThird");

    firstSelect.addEventListener("change", function () {
        updateSelectOptions("fieldsSecond", [firstSelect]);
        updateSelectOptions("fieldsThird", [firstSelect, secondSelect]);
    });

    secondSelect.addEventListener("change", function () {
        updateSelectOptions("fieldsThird", [firstSelect, secondSelect]);
    });

    const sortButton = document.getElementById("sortBtn");

    sortButton.addEventListener("click", function () {
        sortTable("list", sortForm);
    });

    const resetBth = document.getElementById("resetSort");

    resetBth.addEventListener("click", function () {

        resetSort("list", "sort");

        filterTable(buildings, "list", form);
    });

    const cleanBth = document.getElementById("clear");

    cleanBth.addEventListener("click", function () {

        clearFilter("list", buildings, form);

        resetSort("list", "sort");

        filterTable(buildings, "list", form);
    });

});