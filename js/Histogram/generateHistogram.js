function generateHistogram(dataToBePlotted) {
    console.log(dataToBePlotted)

    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

    // X axis: scale and draw:
    const x = d3.scaleLinear()
        .domain([0, Object.keys(dataToBePlotted).length])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    // Y axis: scale and draw:
        const y = d3.scaleLinear()
            .range([height, 0]);
            y.domain([0, 10]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
        .call(d3.axisLeft(y));


    for(const key in dataToBePlotted) {
        console.log(key)
        // append the bar rectangles to the svg element
            svg.selectAll("rect")
                .data(dataToBePlotted[key])
                .join("rect")
                .attr("x", 1)
                .attr("width", key)
                .attr("height", function (d) { return console.log(d)})
                .style("fill", "#69b3a2")
        console.log(dataToBePlotted[key])
    }
}

export default generateHistogram