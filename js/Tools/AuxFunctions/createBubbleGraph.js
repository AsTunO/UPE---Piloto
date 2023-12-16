import histogram from "../../Histogram/histogram.js";

function createGraph(dataToBePlotted, activity) {


    d3.select("svg").remove()
    d3.select(".tooltip").remove();

    const margin = { top: 0, right: 5, bottom: 80, left: 30 },
        width = 600,
        height = 350

    const svg = d3.select("#bubbleChart")
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

    console.log(dataToBePlotted.domainContent.x)
          

    const x = d3.scaleBand()
    .domain(dataToBePlotted.domainContent.x)
    .range([0, width])
    .padding(1);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Adicione traduções em português inclinadas abaixo do eixo X
svg.append("g")
    .selectAll("text")
    .data(dataToBePlotted.domainContent.x)
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
svg.selectAll(".tick text")
.attr("fill-opacity", 0);

    // Custom Y scale with icons
    const yDomain = [
        { content: "course_vis", icon: "fa-mouse-pointer", iconColor: "#8d6e63" },
        { content: "resource_vis", icon: "fa-folder-open", iconColor: "#e64a19" },
        { content: "forum_vis", icon: "fa-comments", iconColor: "#ff94c2" },
        { content: "forum_participation", icon: "fa-comment-medical", iconColor: "#00bcd4" },
        { content: "assignment_vis", icon: "fa-file-alt", iconColor: "#00897b" },
        { content: "assignment_try", icon: "fa-check", iconColor: "#819ca9" },
        { content: "assignment_sub", icon: "fa-check-double", iconColor: "#c0ca33" }
    ];

    const description = {
        "fa-mouse-pointer" : "Visualização do curso",
        "fa-folder-open" : "Visualização do recurso",
        "fa-comments" : "Visualização do forum", 
        "fa-comment-medical" : "Participação do forum",
        "fa-file-alt" : "Visualização da atividade",
        "fa-check" : "Tentativa da atividade",
        "fa-check-double" : "Entrega da atividade"
    }

    const y = d3.scaleBand()
        .domain(yDomain.map(d => d.content))
        .range([height, 0])
        .padding(1);

    // Add custom Y axis with icons
    svg.append("g")
        .selectAll("g")
        .data(yDomain)
        .enter()
        .append("g")
        .attr("transform", d => `translate(0,${y(d.content)})`)
        .call(g => {
            g.append("foreignObject")
                .attr("width", 20)
                .attr("height", 20)
                .html(d => `<i class="fa-solid ${d.icon}" style="color: ${d.iconColor};"></i>`)
                .attr("x", -30)
                .attr("y", -10)
                // Adicione tooltips aqui
                .on("mouseover", function(event, d) {
                    console.log(description[d.icon])
                    tooltip.style("opacity", 1)
                        .html(description[d.icon])
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function() {
                    tooltip.style("opacity", 0);
                });
        });


    svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d => yDomain.find(item => item.content === d).description));

    function getAdditionalInformation(d, totalStudents) {

        let percent = ((d.totalCases / totalStudents) * 100).toFixed(2)
        if (percent > 100) {
            return (d.totalCases + " ocorrências")
        }
        else {
            return (percent + "% alunos participaram desse evento nesse dia.")
        }
    }
    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([180, 2500]) // ALERT
        .range([1, 40]);

    // Adicione linhas de grade para o eixo X
    svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(-height).tickFormat(""));

    // Adicione linhas de grade para o eixo Y
    svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickSize(-width).tickFormat(""));

    // Get the bubble color 
    function myColor(average) {
        console.log(average)
        let color = ""
        if (average < 5.5) {
            color = "#FF0000"
        } else if (average >= 5.5 && average < 6) {
            color = "#FFA500"
        } else if (average >= 6.0 && average < 6.5) {
            color = "#FFF000"
        } else if (average >= 6.5 && average < 7) {
            color = "#90EE90"
        } else {
            color = "#008000"
        }
        return color
    }

    // Criação do elemento tooltip no DOM
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "black")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("z-index", "9999");

    svg.append('g')
    .selectAll("dot")
    .data(dataToBePlotted.bubblesContent)
    .enter()
    .append("g")
    .append("circle")
    .attr("class", "bubble")
    .attr("cx", function (d) { return x(d.date); })
    .attr("cy", function (d) { return y(d.event); })
    .attr("r", 0) // Comece com raio zero para animação de crescimento
    .style("fill", function (d) { return myColor(d.totalSumOfGrades / d.totalCases) })
    .style("opacity", "0.7")
    .attr("stroke", "black")
    .on("click", function (d) {

        var histogramField = document.getElementById("histogram");
    histogramField.innerHTML = "";

    // Adicione a classe 'selected' apenas para a bolha clicada
    d3.selectAll(".bubble").classed("selected", false); // Remove 'selected' de todas as bolhas
    d3.select(this).classed("selected", true); // Adiciona 'selected' à bolha clicada

    // Outras ações desejadas ao clicar na bolha
    var datum = d3.select(this).datum();
    histogram(datum.grades, activity, datum);
    }).transition() // Inicia a transição para animar o crescimento do raio
    .duration(800)
    .attr("r", function (d) { return z(d.totalCases); }); 
}

export default createGraph