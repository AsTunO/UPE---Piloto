function createGraph(data) {

    d3.select("svg").remove();
    d3.select(".tooltip").remove();

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
        .domain((data.domainContent.x).map(d => d))
        .range([0, width])
        .padding(1);
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Draw Y domain
    const y = d3.scaleBand()
        .domain((data.domainContent.y).map(d => d.text))
        .range([height, 0])
        .padding(1);
    svg.append("g")
        .classed("y-axis", true)
        .call(d3.axisLeft(y));

    // Hide Y axis
    svg.select(".y-axis").style("display", "none");

    // Draw Lines
    svg.append("path")
        .datum(data.dotsContent)
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.event)))


    // Draw Dots
    svg.append("g")
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