import lineChart from "../LineChart/LineChartGraph/js/lineChart.js";

function generateHistogram(dataToBePlotted, activity) {
    dataToBePlotted.sort((a, b) => a.average - b.average);

    const margin = { top: 10, right: 30, bottom: 50, left: 40 };
    const width = 360 - margin.left - margin.right;
    const height = 374 - margin.top - margin.bottom;

    const originalColor = d3.scaleLinear().domain([0, 2.5, 5, 7.5, 10]).range(['#FF0000', '#FFA500', '#FFF000', '#90EE90', '#008000']);
    const highlightColor = 'blue';

    const svg = d3
        .select('#histogram')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
        .scaleBand()
        .domain(dataToBePlotted.map(d => d.average))
        .range([0, width])
        .padding(0.1);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(dataToBePlotted, d => d.len)])
        .range([height, 0]);
    svg
        .append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

    svg.select('.y-axis').remove();
    d3.select('.y-axis').style('display', 'none');

    svg
        .selectAll('rect')
        .data(dataToBePlotted)
        .join('rect')
        .attr('x', function (d) {
            return x(d.average);
        })
        .attr('y', function (d) {
            return y(d.len);
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
            return height - y(d.len);
        })
        .style('fill', function (d) {
            return originalColor(d.average);
        })
        .on("click", function () {
            const clickedRect = d3.select(this);
            
            svg.selectAll('rect')
                .style('fill', function (d) {
                    return (d === clickedRect.datum()) ? originalColor(d.average) : 'rgba(0, 0, 0, 0.2)';
                });

            const d = clickedRect.datum();
            lineChart(d.ids, activity);
        });
}

export default generateHistogram;
