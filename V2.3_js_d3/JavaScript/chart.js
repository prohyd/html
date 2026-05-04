const colors = ["red", "green", "blue"];

const metricMap = {
    "Максимальная высота или длина": "maxSize",
    "Минимальная высота или длина": "minSize",
    "Максимальная масса тела": "maxWeight"
};

function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];

    for (let entry of groupObj) {
        const values = entry[1];
        arrGraph.push({
            labelX: entry[0],
            maxSize: d3.max(values, d => d["Высота или длина"]),
            minSize: d3.min(values, d => d["Высота или длина"]),
            maxWeight: d3.max(values, d => d["Масса тела"])
        });
    }

    return arrGraph;
}

export function drawGraph(keyX, data, checkedSettings, typeChart) {
    let arrGraph = createArrGraph(data, keyX);

    if (keyX === "Продолжительность жизни") {
        arrGraph = arrGraph.sort((a, b) => a.labelX - b.labelX);
    } else {
        arrGraph = arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX)));
    }

    let svg = d3.select("svg");
    svg.selectAll("*").remove();

    let attrArea = {
        width: parseFloat(svg.style("width")),
        height: parseFloat(svg.style("height")),
        marginX: 50,
        marginY: 50
    };

    const [scX, scY] = createAxis(svg, arrGraph, attrArea, checkedSettings);

    checkedSettings.forEach((elem, index) => {
        switch (typeChart) {
            case "Точечная":
                createChart(svg, arrGraph, scX, scY, attrArea, colors[index], elem.value, index, checkedSettings.length);
                break;
            case "Гистограмма":
                createChartGist(svg, arrGraph, scX, scY, attrArea, colors[index], elem.value, index, checkedSettings.length);
                break;
            case "График":
                createChartGraph(svg, arrGraph, scX, scY, attrArea, colors[index], elem.value, index, checkedSettings.length);
                break;
        }
    });
}

function createAxis(svg, data, attrArea, checkedSettings) {
    const selectedKeys = checkedSettings.map(item => metricMap[item.value]);
    const allValues = data.flatMap(item => selectedKeys.map(key => item[key]));
    const min = d3.min(allValues);
    const max = d3.max(allValues);

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attrArea.width - 2 * attrArea.marginX]);

    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.2])
        .range([attrArea.height - 2 * attrArea.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.height - attrArea.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function getMetricValue(item, metricName) {
    return item[metricMap[metricName]];
}

function getOffset(index, total) {
    if (total === 1) {
        return 0;
    }
    return (index - (total - 1) / 2) * 12;
}

function createChart(svg, data, scaleX, scaleY, attrArea, color, metricName, index, total) {
    const offset = getOffset(index, total);

    svg.selectAll(`.dot-${index}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + offset)
        .attr("cy", d => scaleY(getMetricValue(d, metricName)))
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("fill", color);
}

function createChartGist(svg, data, scaleX, scaleY, attrArea, color, metricName, index, total) {
    const width = Math.max(8, scaleX.bandwidth() / Math.max(total + 1, 3));
    const offset = getOffset(index, total) - width / 2;

    svg.selectAll(`.bar-${index}`)
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + offset)
        .attr("y", d => scaleY(getMetricValue(d, metricName)))
        .attr("width", width)
        .attr("height", d => scaleY.range()[0] - scaleY(getMetricValue(d, metricName)))
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("fill", color);
}

function createChartGraph(svg, data, scaleX, scaleY, attrArea, color, metricName, index, total) {
    const offset = getOffset(index, total);

    let lineF = d3.line()
        .curve(d3.curveMonotoneX)
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + offset)
        .y(d => scaleY(getMetricValue(d, metricName)));

    svg.append("path")
        .datum(data)
        .attr("d", lineF)
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("stroke-width", "2")
        .style("stroke", color);
}
