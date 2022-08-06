// https://d3-graph-gallery.com/

const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv",

    function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
    }).then(

        function (data) {

            const x = d3.scaleTime()
                .domain(d3.extent(data, d => d.date))
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            const y = d3.scaleLinear()
                .domain([8000, 9200])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 1.5)
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
        })


/*const DATASTORE = {
    curse_infos: null,
    event_mapping: null,
}

d3.csv("./data/event_mapping.csv",
    function (data) {
        DATASTORE.event_mapping = data;
    });

d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv", 
    function (data) {
        DATASTORE.curse_infos = data;
    })

console.log(DATASTORE); */