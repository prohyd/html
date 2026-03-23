const createTable = (data, idTable) => { 
    const table = document.getElementById(idTable); 
    const header = Object.keys(data[0]); 
    
    /* создание шапки таблицы */ 
    const headerRow = createHeaderRow(header); 
    table.append(headerRow); 
     
    /* создание тела таблицы */ 
    const bodyRows = createBodyRows(data); 
    table.append(bodyRows);
}; 
 
const createHeaderRow = (headers) => { 
    const tr = document.createElement('tr'); 
    headers.forEach(header => { 
        const th = document.createElement('th'); 
        th.innerHTML = header; 
        tr.append(th); 
    }); 
    return tr; 
};

const createBodyRows = (data) => {
    const tbody = document.createElement("tbody");
    data.forEach(item => {
        const row = document.createElement("tr");

        Object.values(item).forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
    return tbody;
};

const clearTable = (idTable) => {
    const table = document.getElementById(idTable);
    table.innerHTML = "";
}