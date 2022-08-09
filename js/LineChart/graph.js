function convertDate(epoch_date) {
    return new Date(+epoch_date * 1000);
}

usersData = []

d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv",

    function (data) {

        usersData.push(
            {
                id: data.userid,
                time: convertDate(data.t),
                //timeLast: (d3.timeParse("%Y-%m-%d")(convertDate(data.t))), // Não Funciona
                //event: getEvent(data.component, data.action, data.target),  // CUIDADO
                component: data.component,
                action: data.action,
                target: data.target,
            });

    }).then(function () {
        usersData.forEach(function (d) {
            // console.log(d)
        })
    });

// Static Graph

const margin = { top: 10, right: 5, bottom: 30, left: 90 },
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("./data/graphData.csv", (d) => {
    return { date: d.date, value: d.value }
}).then((data) => {
    // const x = d3.scaleTime()
    // .domain(d3.extent(data, d => d.date))
    // .range([0, width]);
    const x = d3.scaleBand()
        .domain(data.map(function (d) { return d.date; }))
        .range([0, width])
        .padding(1);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // const y = d3.scaleLinear()
    const y = d3.scaleBand()
        .domain(data.map(d => d.value))
        .range([height, 0])
        .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value))
        )

    svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 5)
        .attr("fill", "#69b3a2")
});