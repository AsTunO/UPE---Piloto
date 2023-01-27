function generateGraph(domainsContent, all_min_users_ways, all_max_users_ways) {

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

    all_min_users_ways.forEach((e) => {
        
        // Draw Lines
        svg.append("path")
            .datum(e)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.event)))
                
        // Draw Dots
        svg.append("g")
            .selectAll("dot")
            .data(e)
            .join("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.event))
            .attr("r", 5)
            .attr("fill", "#69b3a2")
    });

    all_max_users_ways.forEach((e) => {

        // Draw Lines
        svg.append("path")
            .datum(e)
            .attr("fill", "none")
            .attr("stroke", "#FF0000")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.event)))

        // Draw Dots
        svg.append("g")
            .selectAll("dot")
            .data(e)
            .join("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.event))
            .attr("r", 5)
            .attr("fill", "#FF0000")
    });

}

export default generateGraph