function createCycloidData() {
    const svg = d3.select("#scene");
    const width = Number(svg.attr("width"));
    const startX = 40;
    const startY = 90;
    const archRadius = 35;
    const periods = 4;
    const maxT = periods * Math.PI * 2;
    const rawWidth = archRadius * maxT;
    const scaleX = (width - 90) / rawWidth;
    const scaleY = 1.8;
    const step = 0.05;
    const data = [];

    for (let t = 0; t <= maxT; t += step) {
        data.push({
            x: startX + archRadius * (t - Math.sin(t)) * scaleX,
            y: startY + archRadius * (1 - Math.cos(t)) * scaleY
        });
    }

    return data;
}

export function drawPath(svg) {
    const dataPoints = createCycloidData();
    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);

    const trajectory = svg.append("path")
        .attr("class", "trajectory")
        .attr("d", line(dataPoints))
        .attr("fill", "none")
        .attr("stroke", "#1d4ed8")
        .attr("stroke-width", 3);

    svg.append("text")
        .attr("class", "hint")
        .attr("x", 42)
        .attr("y", 42)
        .text("Траектория: циклоидальная кривая");

    return trajectory;
}

export function translateAlong(path, startScale, endScale, startRotate, endRotate) {
    const length = path.getTotalLength();

    return () => (t) => {
        const scale = startScale + (endScale - startScale) * t;
        const rotate = startRotate + (endRotate - startRotate) * t;
        const point = path.getPointAtLength(t * length);

        return `translate(${point.x},${point.y}) scale(${scale}) rotate(${rotate})`;
    };
}
