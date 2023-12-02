import bubbleChart from "./BubbleChartGraph/bubbleChart.js";
import populateSelectFilters from "./Tools/AuxFunctions/populateSelectFilters.js"

d3.csv("./data/see_course2060_quiz_list.csv").then(data => {
    populateSelectFilters(data)
});

bubbleChart()

document.addEventListener("DOMContentLoaded", function () {
    var backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.parentElement.style.display = "block";
        } else {
            backToTopBtn.parentElement.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});