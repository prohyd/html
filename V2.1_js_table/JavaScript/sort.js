const createSortArr = (data) => {
    let sortArr = [];

    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {

        const keySort = item.value;

        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + 'Desc').checked;

        sortArr.push({
            column: keySort - 1,
            direction: desc
        });
    }

    return sortArr;
};

const sortTable = (idTable, formData) => {

    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {

        clearTable(idTable);
        createTable(buildings, idTable);

        return;
    }

    let table = document.getElementById(idTable);

    let rowData = Array.from(table.rows);

    const headerRow = rowData.shift();

    rowData.sort((first, second) => {

        for (let { column, direction } of sortArr) {

            let firstCell = first.cells[column].innerHTML;
            let secondCell = second.cells[column].innerHTML;

            let firstNum = parseFloat(firstCell);
            let secondNum = parseFloat(secondCell);

            let comparison;

            if (!isNaN(firstNum) && !isNaN(secondNum)) {
                comparison = firstNum - secondNum;
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }

            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }

        }

        return 0;

    });

    clearTable(idTable);

    const tableElement = document.getElementById(idTable);

    tableElement.append(headerRow);

    const tbody = document.createElement("tbody");

    rowData.forEach(row => {
        tbody.append(row);
    });

    tableElement.append(tbody);

}

const resetSort = (idTable, formId) => {

    const form = document.getElementById(formId);

    form.reset();

    const selects = form.getElementsByTagName("select");

    for (let i = 1; i < selects.length; i++) {
        selects[i].disabled = true;
    }

    clearTable(idTable);
    createTable(buildings, idTable);

}