function generateHistogram(dataToBePlotted) {

    // ordenar os dados pelo valor da propriedade "average" em ordem crescente
    dataToBePlotted.sort((a, b) => a.average - b.average);

    const margin = { top: 10, right: 30, bottom: 50, left: 40 };
    const width = 460 - margin.left - margin.right;
    const height = 550 - margin.top - margin.bottom;

    const svg = d3
        .select('#canvas')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis: scale and draw
    const x = d3
        .scaleBand()
        .domain(dataToBePlotted.map(d => d.average))
        .range([0, width])
        .padding(0.1);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Y axis: scale and draw
    const y = d3
        .scaleLinear()
        .domain([0, d3.max(dataToBePlotted, d => d.len)])
        .range([height, 0]);
    svg
        .append('g')
        .attr('class', 'y-axis') // add class 'y-axis' to the group
        .call(d3.axisLeft(y));

    // hide Y axis
    svg.select('.y-axis').remove();
    d3.select('.y-axis').style('display', 'none');

    // define color scale
    const color = d3.scaleLinear().domain([0, 5, 10]).range(['#f44336', '#ffc107', '#4caf50']);

    // plot histogram bars
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
            return color(d.average);
        })
        .on("click", function () {
            const d = d3.select(this).datum();
            console.log(d.ids);
        })
}

export default generateHistogram;
