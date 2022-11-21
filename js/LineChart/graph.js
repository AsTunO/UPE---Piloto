import epochToDate  from '../Tools/DateFunctions/date.js'
import filterByPeriod from '../Tools/FiltersFunctions/filterByPeriod.js'
import filterByUser from '../Tools/FiltersFunctions/filterByUser.js';
import sortEventsByTime from '../Tools/SortsFunctions/sortEventsByTime.js';

export default (user) => {

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

    Promise.all([
        d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
        d3.csv("./data/event_mapping.csv")
    ]).then(function (data) {

        // Variables to save the index of the array provided by the d3.js function
        let logs_filtered_data = 0; 
        let event_mapping_data = 1;

        const userData = [];
        const auxEventList = [];
        const logs_filtered = data[logs_filtered_data];
        const event_mapping = data[event_mapping_data];

        sortEventsByTime(logs_filtered);

        var logs_filtered_by_period = []
        logs_filtered.forEach(function (rawData) {
            if (filterByPeriod(rawData)) {
                logs_filtered_by_period.push(rawData)
            }
        })

        // Get the content of X domain
        var xTempDomainContent = []

        logs_filtered_by_period.forEach((e) => {
            xTempDomainContent.push(d3.timeFormat("%A, %d")(epochToDate(e.t)))
        })

        var xDomainContent = xTempDomainContent.filter((current, i) =>
            xTempDomainContent.indexOf(current) === i
        );

        // Draw X domain
        const x = d3.scaleBand()
            .domain(xDomainContent.map(d => d))
            .range([0, width])
            .padding(1);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Get the content of the Y domain
        var event_mapping_class = []

        event_mapping.forEach((e) => {
            event_mapping_class.push(e.class)
        })

        var yDomainContent = event_mapping_class.filter((current, i) => 
            event_mapping_class.indexOf(current) === i
        );

        // Draw Y domain
        const y = d3.scaleBand().domain(yDomainContent.map(d => d))
            .range([height, 0])
            .padding(1);
        svg.append("g")
            .call(d3.axisLeft(y));

        logs_filtered_by_period.forEach(function (rawData) {
            if (filterByUser(rawData, user)) {
                event_mapping.forEach((event) => {
                    if (rawData.component == event.component && rawData.action == event.action && rawData.target == event.target) {
                        if ((auxEventList.length == 0) || !auxEventList.includes(event.class)) {
                            auxEventList.push(event.class)
                            userData.push({
                                date: d3.timeFormat("%A, %d")(epochToDate(rawData.t)),
                                event: event.class
                            })
                        }
                    }
                });
            }
        });

        svg.append("path")
            .datum(userData)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.event)))
        svg.append("g")
            .selectAll("dot")
            .data(userData)
            .join("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.event))
            .attr("r", 5)
            .attr("fill", "#69b3a2")
    });
}
