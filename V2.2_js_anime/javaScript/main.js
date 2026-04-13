import { drawCat } from "./image.js";
import { drawPath, translateAlong } from "./path.js";

function getEaseFunction(value) {
    switch (value) {
        case "easeBounce":
            return d3.easeBounce;
        case "easeSin":
            return d3.easeSinInOut;
        default:
            return d3.easeLinear;
    }
}

function drawScene() {
    const svg = d3.select("#scene");
    svg.selectAll("*").remove();

    const path = drawPath(svg);
    const pict = drawCat(svg);
    const startPoint = path.node().getPointAtLength(0);

    pict.attr("transform", "translate(" + startPoint.x + "," + startPoint.y + ") scale(0.7) rotate(-15)");

    return { path, pict };
}

function runAnimation(dataForm) {
    const selectedAnimation = d3.select("#selectAnimation").property("value");
    const speed = Number(dataForm.speedAnimation.value);
    const startScale = Number(dataForm.sx.value);
    const endScale = Number(dataForm.sx_final.value);
    const startRotate = Number(dataForm.corner.value);
    const endRotate = Number(dataForm.corner_final.value);
    const easeFunction = getEaseFunction(selectedAnimation);

    const scene = drawScene();

    scene.pict.transition()
        .duration(speed)
        .ease(easeFunction)
        .attrTween(
            "transform",
            translateAlong(
                scene.path.node(),
                startScale,
                endScale,
                startRotate,
                endRotate
            )
        );
}

document.addEventListener("DOMContentLoaded", () => {
    const settingForm = d3.select("#setting");

    drawScene();

    if (setSettingsButton) {
        setSettingsButton.addEventListener("click", () => {
            drawScene();
        });
    }

    if (animateButton) {
        animateButton.addEventListener("click", () => {
            runAnimation(settingForm.node());
        });
    }

    if (resetSettingsButton) {
        resetSettingsButton.addEventListener("click", () => {
            d3.select("#scene").selectAll("*").remove();
        });
    }
});
