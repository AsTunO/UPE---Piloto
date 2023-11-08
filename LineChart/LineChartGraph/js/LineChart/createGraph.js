let count = 0;

function createGraph(data) {

    count++;
    if(count <= 3) {

        const margin = { top: 0, right: 1, bottom: 60, left: 20 },
            width = 1000,
            height = 200
    
        const svgLine = d3.select("#lineChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
            const diasDaSemana = {
                'Monday': 'Segunda-feira',
                'Tuesday': 'Terça-feira',
                'Wednesday': 'Quarta-feira',
                'Thursday': 'Quinta-feira',
                'Friday': 'Sexta-feira',
                'Saturday': 'Sábado',
                'Sunday': 'Domingo'
              };
    
              
    
        const x = d3.scaleBand()
        .domain(data.domainContent.x)
        .range([0, width])
        .padding(1);
    
    svgLine.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Adicione traduções em português inclinadas abaixo do eixo X
svgLine.append("g")
.selectAll("text")
.data(data.domainContent.x)
.enter()
.append("text")
.text(d => {
    const diaSemana = d.split(",")[0]; // Extrai o dia da semana
    return `${diasDaSemana[diaSemana]}, ${d.split(",")[1]}`; // Combina a tradução com o resto da data
})
.attr("x", d => x(d) + x.bandwidth() / 2)
.attr("y", height + 30) // Ajuste a posição vertical conforme necessário
.attr("text-anchor", "middle")
.attr("font-size", 10) // Ajuste o tamanho da fonte conforme necessário
.attr("fill-opacity", 1) // Define o preenchimento para tornar o texto visível
.attr("transform", d => `rotate(-25, ${x(d) + x.bandwidth() / 2}, ${height + 80})`); // Inclina o texto em -45 graus

// Estilize os elementos de texto originais em inglês como transparentes
svgLine.selectAll(".tick text")
.attr("fill-opacity", 0);
    
        // Draw Y domain
        const y = d3.scaleBand()
            .domain((data.domainContent.y).map(d => d.text))
            .range([height, 0])
            .padding(1);
        svgLine.append("g")
            .classed("y-axis", true)
            .call(d3.axisLeft(y));
    
        // Hide Y axis
        svgLine.select(".y-axis").style("display", "none");
    
        svgLine.attr("transform", `translate(0,${margin.top})`);
    
        // Draw Lines
        svgLine.append("path")
            .datum(data.dotsContent)
            .attr("fill", "none")
            .attr("stroke", "#000000")
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x(d => x(d.date))
                .y(d => y(d.event)))
    
        // Draw Dots
        svgLine.append("g")
        .selectAll("dot")
        .data(data.dotsContent)
        .join("g")
        .attr("class", "dot") 
        .attr("transform", d => `translate(${x(d.date)},${y(d.event)})`)
        .call(g => {
            g.append("circle")
                .attr("r", 12)
                .style("fill", "white");
                
            g.append("text")
                .attr("class", "fa-solid") 
                .style("font-size", "20px") 
                .style("fill", d => d["icon"].color)
                .text(d => d["icon"].unicode) 
                .attr("text-anchor", "middle") 
                .attr("dominant-baseline", "middle");
        });
    }else {
        console.log("Limite")
    }

}

export default createGraph
