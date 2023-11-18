import bubbleChart from "./BubbleChartGraph/bubbleChart.js";
import populateSelectFilters from "./Tools/AuxFunctions/populateSelectFilters.js"

d3.csv("./data/see_course2060_quiz_list.csv").then(data => {
    populateSelectFilters(data)
});

bubbleChart()



