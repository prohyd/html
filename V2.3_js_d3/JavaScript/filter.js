import { buildings } from "./data.js";
import { createTable, clearTable, createHeaderTable } from "./table.js";

const correspond = {
    "Название": "nameAnimal",
    "Тип": "typeAnimal",
    "Среда обитания": "habitatAnimal",
    "Высота или длина": ["sizeFrom", "sizeTo"],
    "Масса тела": ["weightFrom", "weightTo"],
    "Продолжительность жизни": ["lifeSpanFrom", "lifeSpanTo"]
};

const dataFilter = (dataForm) => {
    let dictFilter = {};

    for (const item of dataForm.elements) {
        let valInput = item.value;

        if (valInput === "") {
            if (item.id && item.id.includes("From")) {
                valInput = -Infinity;
            }
            if (item.id && item.id.includes("To")) {
                valInput = Infinity;
            }
            dictFilter[item.id] = valInput;
            continue;
        }

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }

        if (item.type === "number") {
            valInput = Number(valInput);
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

export const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    let tableFilter = data.filter(item => {
        let result = true;
        Object.entries(item).forEach(([key, val]) => {
            if (typeof val === "string") {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
            }
            if (typeof val === "number") {
                if (key === "Высота или длина") {
                    result &&= val >= datafilter.sizeFrom && val <= datafilter.sizeTo;
                }
                if (key === "Масса тела") {
                    result &&= val >= datafilter.weightFrom && val <= datafilter.weightTo;
                }
                if (key === "Продолжительность жизни") {
                    result &&= val >= datafilter.lifeSpanFrom && val <= datafilter.lifeSpanTo;
                }
            }
        });
        return result;
    });

    clearTable(idTable);
    if (tableFilter.length > 0) {
        createTable(tableFilter, idTable);
    } else {
        createHeaderTable(buildings, idTable);
    }
};

export const clearFilter = () => {
    document.getElementById("filter").reset();
    clearTable("list");
    createTable(buildings, "list");
};
