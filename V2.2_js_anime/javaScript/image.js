export function drawCat(svg) {
    const cat = svg.append("g")
        .attr("class", "cat")
        .attr("transform", "translate(0,0) scale(1) rotate(0)");

    cat.append("ellipse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("rx", 34)
        .attr("ry", 24)
        .attr("fill", "#f59e0b")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 2);

    cat.append("circle")
        .attr("cx", 0)
        .attr("cy", -30)
        .attr("r", 20)
        .attr("fill", "#f59e0b")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 2);

    cat.append("polygon")
        .attr("points", "-13,-42 -23,-60 -2,-49")
        .attr("fill", "#f59e0b")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 2);

    cat.append("polygon")
        .attr("points", "13,-42 23,-60 2,-49")
        .attr("fill", "#f59e0b")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 2);

    cat.append("circle")
        .attr("cx", -7)
        .attr("cy", -34)
        .attr("r", 2.8)
        .attr("fill", "#111827");

    cat.append("circle")
        .attr("cx", 7)
        .attr("cy", -34)
        .attr("r", 2.8)
        .attr("fill", "#111827");

    cat.append("polygon")
        .attr("points", "0,-28 -4,-22 4,-22")
        .attr("fill", "#f97316");

    cat.append("path")
        .attr("d", "M -6 -18 Q 0 -12 6 -18")
        .attr("fill", "none")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 1.8)
        .attr("stroke-linecap", "round");

    cat.append("line")
        .attr("x1", -6)
        .attr("y1", -25)
        .attr("x2", -20)
        .attr("y2", -28)
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 1.6);

    cat.append("line")
        .attr("x1", -6)
        .attr("y1", -22)
        .attr("x2", -20)
        .attr("y2", -20)
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 1.6);

    cat.append("line")
        .attr("x1", 6)
        .attr("y1", -25)
        .attr("x2", 20)
        .attr("y2", -28)
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 1.6);

    cat.append("line")
        .attr("x1", 6)
        .attr("y1", -22)
        .attr("x2", 20)
        .attr("y2", -20)
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 1.6);

    cat.append("path")
        .attr("d", "M 30 0 Q 55 -20 48 -44")
        .attr("fill", "none")
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round");

    return cat;
}
