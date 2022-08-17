export default (user) => {

    const test = [
        { "dat": "Seg", "eve": "" },
        { "dat": "Ter", "eve": "Acessou curso" },
        { "dat": "Qua", "eve": "Acessou fórum" },
        { "dat": "Qui", "eve": "" },
        { "dat": "Sex", "eve": "Postou no fórum" },
        { "dat": "Sex", "eve": "Vis. Ativ." },
        { "dat": "Sab", "eve": "Iniciou Ativ." },
        { "dat": "Dom", "eve": "Submeteu Ativ." },
    ]

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

    Promise.all([
        d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
        d3.csv("./data/event_mapping.csv")
    ]).then(function (data) {
        const userData = [];

        const auxEventList = [];

        const logs_filtered = data[0];
        const event_mapping = data[1];

        // console.log(event_mapping)

        sortEventsByTime(logs_filtered);

        logs_filtered.forEach(function (rawData) {
            if (filterByPeriod(rawData) && filterByUser(rawData)) {
                // console.log(rawData);
                event_mapping.forEach((event) => {
                    if (rawData.component == event.component && rawData.action == event.action && rawData.target == event.target) {
                        if ((auxEventList.length == 0) || !auxEventList.includes(event.class)) {
                            auxEventList.push(event.class)
                            userData.push({
                                date: d3.timeFormat("%A, %d")(convertDate(rawData.t)),
                                event: event.class
                            })
                        }
                    }
                });
            }
        });

        console.log(userData)
        const x = d3.scaleBand()
            .domain(userData.map(d => d.date))
            // .domain(data[0].map(d => d.date))
            .range([0, width])
            .padding(1);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // const y = d3.scaleLinear()
        const y = d3.scaleBand()
            .domain(userData.map(d => d.event))
            // .domain(data[0].map(d => d.event))
            .range([height, 0])
            .padding(1);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(userData)
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
            .data(userData)
            .join("circle")
            .attr("cx", d => x(d.date))
            .attr("cy", d => y(d.event))
            .attr("r", 5)
            .attr("fill", "#69b3a2")

    });
}
