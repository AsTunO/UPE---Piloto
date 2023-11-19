import lineChart from "../LineChart/LineChartGraph/js/lineChart.js";

function generateHistogram(dataToBePlotted, activity, datumBubble) {
    dataToBePlotted.sort((a, b) => a.average - b.average);

    const margin = { top: 52, right: 30, bottom: 50, left: 20 };
    const width = 200;
    const height = 200;

    const originalColor = d3.scaleLinear().domain([0, 2.5, 5, 7.5, 10]).range(['#FF0000', '#FFA500', '#FFF000', '#90EE90', '#008000']);

    const svg = d3
        .select('#histogram').html('')
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
        .attr('y', height) // Começa no fundo
        .attr('width', x.bandwidth())
        .attr('height', 0) // Começa sem altura
        .style('fill', function (d) {
            return originalColor(d.average);
        })
        .on("click", function () {
            const clickedRect = d3.select(this);

            svg.selectAll('rect')
                .transition()
                .duration(500)
                .style('opacity', function (d) {
                    return (d === clickedRect.datum()) ? 1 : 0.2;
                });

            const d = clickedRect.datum();
            lineChart(d.ids, activity, d.average, datumBubble);
        })
        .transition()
        .duration(1000)
        .attr('y', function (d) {
            return y(d.len);
        })
        .attr('height', function (d) {
            return height - y(d.len);
        });

    // Adicionando um evento de clique ao SVG inteiro
svg.on("click", function(event) {
    const isNotBar = !event.target.matches("rect"); // Verifica se o alvo do clique não é uma coluna do histograma

    if (isNotBar) {
        // Retorna a opacidade das colunas para 1
        svg.selectAll('rect')
            .transition()
            .duration(500)
            .style('opacity', 1);
    }
});
}

export default generateHistogram;
