function createGraph(data, xdomain, average) {
    console.log(average)

    //d3.select("svg").remove();
    //d3.select(".tooltip").remove();

    function getColor(grade) {
        if(grade > 7.5) {
            return "#90EE90"
        }else if(grade <= 7.5 && grade > 5){
            return "#FFFFE0"
        }else if(grade <= 5){
            return "#FF6961"
        }
    }

    const margin = { top: 10, right: 5, bottom: 30, left: 90 },
        width = 860 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    const svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("style", `background-color:${getColor(average)} ;`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw X domain
    const x = d3.scaleBand()
        .domain((data.domainContent.x).map(d => d))
        .range([0, width])
        .padding(1);
    
    svg.append("g")
        .classed("x-axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    if(xdomain == true) {
        // Hide X axis
        svg.select(".x-axis").style("display", "none");
    }

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
            .style("fill", getColor(average));
            
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