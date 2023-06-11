import histogram from "../../Histogram/histogram.js";

function createGraph(dataToBePlotted) {

    d3.select("svg").remove()
    d3.select(".tooltip").remove();

    const margin = { top: 10, right: 5, bottom: 30, left: 90 },
        width = 700 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    const svg = d3.select("#bubbleChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw X domain
    const x = d3.scaleBand()
        .domain((dataToBePlotted.domainContent.x).map(d => d))
        .range([0, width])
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    const yDomain = [
        {content : "course_vis", description:"Visualização do curso"},
        {content: "resource_vis", description:"Visualização do material"},
        {content: "forum_vis", description: "Visualização do forum"},
        {content: "forum_participation", description:"Participação do forum"},
        {content:"assignment_vis", description:"Visualização da atividade"},
        {content:"assignment_try", description:"Tentativa da atividade"},
        {content:"assignment_sub", description:"Entrega da atividade"}
    ]

    const y = d3.scaleBand()
        .domain(yDomain.map(d => d.content))
        .range([height, 0])
        .padding(1);

    svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d => yDomain.find(item => item.content === d).description));

    function getAdditionalInformation(d, totalStudents) {

        let percent = ((d.totalCases / totalStudents) * 100).toFixed(2)
        if(percent > 100) {
            return (d.totalCases + " ocorrências")
        }
        else {
            return (percent + "% alunos participaram desse evento nesse dia.")
        }
    }
        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain([300, 2500]) // ALERT
            .range([1, 40]);

            
   

    // Get the bubble color 
    function myColor(average) {
        let color = ""
        if(average < 4) {
            color = "#FF0000"
        }else if(average >= 4.1 && average < 6.9) {
            color = "#FFF000"
        }else {
            color = "#008000"
        }
        return color
    }

    // -1- Create a tooltip div that is hidden by default:
    const tooltip = d3.select("#canvas")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    const showTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html(getAdditionalInformation(d, dataToBePlotted.totalStudents))
            .style("left", (event.x) / 2 + "px")
            .style("top", (event.y) / 2 + 30 + "px")
    }

    const moveTooltip = function (event, d) {
        tooltip
            .style("left", (event.x) / 2 + "px")
            .style("top", (event.y) / 2 + 30 + "px")
    }
    const hideTooltip = function (event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(dataToBePlotted.bubblesContent)
        .enter()
        .append("g")
        .append("circle")
        .attr("cx", function (d) { return x(d.date); })
        .attr("cy", function (d) { return y(d.event); })
        .attr("r", function (d) { return z(d.totalCases); })
        .style("fill", function (d) { return myColor(d.totalSumOfGrades / d.totalCases) })
        .style("opacity", "0.7")
        .attr("stroke", "black")
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
        .on("click", function (d) {
            var datum = d3.select(this).datum();
            histogram(datum.grades);
        });
}

export default createGraph