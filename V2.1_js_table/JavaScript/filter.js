const correspond = { 
    "Название": "name", 
    "Тип": "type", 
    "Среда обитания": "habitat", 
    "Высота": ["heightFrom", "heightTo"], 
    "Масса тела": ["weightFrom", "weightTo"], 
    "Продолжительность жизни": ["lifeFrom", "lifeTo"] 
}

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {

        if (!item.id) continue;

        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }

        if (item.type === "number") {

            if (valInput !== "") {
                valInput = Number(valInput);
            } 
            else if (item.id.includes("From")) {
                valInput = -Infinity;
            } 
            else if (item.id.includes("To")) {
                valInput = Infinity;
            }
        }

        dictFilter[item.id] = valInput;
    }

    return dictFilter;
}

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {

        let result = true;

        Object.entries(item).forEach(([key, val]) => {

            if (typeof val === 'string') {

                result &&= val.toLowerCase().includes(
                    datafilter[correspond[key]]
                );
            }

            if (typeof val === 'number') {

                let range = correspond[key];

                if (Array.isArray(range)) {
                    result &&=
                        val >= datafilter[range[0]] &&
                        val <= datafilter[range[1]];
                }
            }

        });

        return result;
    });

    clearTable(idTable);

    if (tableFilter.length === 0) {

        const header = Object.keys(data[0]);

        const table = document.getElementById(idTable);

        const headerRow = createHeaderRow(header);

        table.append(headerRow);

        return;
    }

    createTable(tableFilter, idTable);
}

const clearFilter = (idTable, data, dataForm) => {

    dataForm.reset();

    clearTable(idTable);

    createTable(data, idTable);
}