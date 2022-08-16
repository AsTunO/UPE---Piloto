export default (user) => {

    function convertDate(epoch_date) {
        return new Date(+epoch_date * 1000);
    }

    function filterByPeriod(rawData) {

        const timeStart = 1573596966
        const timeEnd = 1574207999

        if (rawData.t >= timeStart && rawData.t <= timeEnd) {
            return true;
        }
    }

    function filterByUser(rawData) {
        if (rawData.userid === user.id) {
            return true;
        }
    }

    function sortEventsByTime(sequence) {
        return sequence.sort((a, b) => +a.t - +b.t);
    }

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

    d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv")
        .then(function (datastore) {

            sortEventsByTime(datastore);

            var userData = []
            var auxEventList = []

            datastore.forEach(function (rawData) {
                if (filterByPeriod(rawData) && filterByUser(rawData)) {
                    d3.csv("./data/event_mapping.csv", function (event) {
                        if (rawData.component == event.component && rawData.action == event.action && rawData.target == event.target) {

                            if (auxEventList.length == 0) {
                                auxEventList.push(event.class)
                                userData.push({
                                    date: d3.timeFormat("%A, %d")(convertDate(rawData.t)),
                                    event: event.class
                                })
                            } else {
                                if (!auxEventList.includes(event.class)) {
                                    auxEventList.push(event.class)
                                    userData.push({
                                        date: d3.timeFormat("%A, %d")(convertDate(rawData.t)),
                                        event: event.class
                                    })
                                }
                            }

                            return userData

                        }
                    }).then(function (data) {

                      
                            const x = d3.scaleBand()
                                .domain(data[0].map(function (d) { return d.date; }))
                                .range([0, width])
                                .padding(1);
                            svg.append("g")
                                .attr("transform", "translate(0," + height + ")")
                                .call(d3.axisBottom(x));

                            // const y = d3.scaleLinear()
                            const y = d3.scaleBand()
                                .domain(data[0].map(d => d.event))
                                .range([height, 0])
                                .padding(1);
                            svg.append("g")
                                .call(d3.axisLeft(y));

                            svg.append("path")
                                .datum(data[0])
                                .attr("fill", "none")
                                .attr("stroke", "#69b3a2")
                                .attr("stroke-width", 2)
                                .attr("d", d3.line()
                                    .x(d => x(d.date))
                                    .y(d => y(d.event))
                                )

                            svg
                                .append("g")
                                .selectAll("dot")
                                .data(data[0])
                                .join("circle")
                                .attr("cx", d => x(d.date))
                                .attr("cy", d => y(d.event))
                                .attr("r", 5)
                                .attr("fill", "#69b3a2")

                    })
                }
            }
            )
        })


}
