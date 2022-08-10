export default (user) => {

    function convertDate(epoch_date) {
        return new Date(+epoch_date * 1000);
    }

    function filterByPeriod(data, period) {
        if (data.t >= period.start && data.t <= period.end) {
            return true;
        }
    }

    let userData = [];

    d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv",
        function (data) {
            if (filterByPeriod(data, {start: 1573596966, end: 1574207999 })) { // 1 Week 
                if (data.userid == user.id) {
                    d3.csv("./data/event_mapping.csv", function (event) {
                        if(data.component == event.component && data.action == event.action && data.target == event.target){
                            
                            let count = 0 
                            userData.forEach(function (d) { // Check if the event already exists in the array
                                if(d.event == event.class){
                                    count++;
                                }
                            })

                            if(count == 0) {
                                userData.push({
                                    date: d3.timeFormat("%A, %d")(convertDate(data.t)),
                                    event: event.class
                                });
                            }
                        }
                    })
                }
            }
        }
    )

    console.log(userData);

    // Static Graph
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
}