function createGraph(domainsContent, data, firstAccess) {

    d3.select("svg").remove();

    const margin = { top: 10, right: 5, bottom: 30, left: 90 },
        width = 860 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw X domain
    const x = d3.scaleBand()
        .domain((domainsContent.x).map(d => d))
        .range([0, width])
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Draw Y domain
    const y = d3.scaleBand().domain((domainsContent.y).map(d => d))
        .range([height, 0])
        .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y));

    if(firstAccess == true) {
        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain([0, 2500])
            .range([1, 40]);
    }else {
        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain([0, 10000])
            .range([1, 40]);
    }

    // Get the bubble color 
    function myColor(average) {
        let color = ""
        if(average < 4.1) {
            color = "#FF0000"
        }else if(average >= 4.2 && average < 5) {
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
            .html(d.tot + " alunos participaram desse evento nesse dia.")
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
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.date); })
        .attr("cy", function (d) { return y(d.event); })
        .attr("r", function (d) { return z(d.tot); })
        .style("fill", function (d) {return myColor(d.average)})
        .style("opacity", "0.7")
        .attr("stroke", "black")
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)
}

export default createGraph