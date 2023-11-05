function createGraph(data) {

    const margin = { top: 0, right: 1, bottom: 30, left: 20 },
        width = 1000,
        height = 200

    const svgLine = d3.select("#lineChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw X domain
    const x = d3.scaleBand()
        .domain((data.domainContent.x).map(d => d))
        .range([0, width])
        .padding(1);
    
    svgLine.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Draw Y domain
    const y = d3.scaleBand()
        .domain((data.domainContent.y).map(d => d.text))
        .range([height, 0])
        .padding(1);
    svgLine.append("g")
        .classed("y-axis", true)
        .call(d3.axisLeft(y));

    // Hide Y axis
    svgLine.select(".y-axis").style("display", "none");

    svgLine.attr("transform", `translate(0,${margin.top})`);

    // Draw Lines
    svgLine.append("path")
        .datum(data.dotsContent)
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.event)))

    // Draw Dots
    svgLine.append("g")
    .selectAll("dot")
    .data(data.dotsContent)
    .join("g")
    .attr("class", "dot") 
    .attr("transform", d => `translate(${x(d.date)},${y(d.event)})`)
    .call(g => {
        g.append("circle")
            .attr("r", 12)
            .style("fill", "white");
            
        g.append("text")
            .attr("class", "fa-solid") 
            .style("font-size", "20px") 
            .style("fill", d => d["icon"].color)
            .text(d => d["icon"].unicode) 
            .attr("text-anchor", "middle") 
            .attr("dominant-baseline", "middle");
    });
}

export default createGraph