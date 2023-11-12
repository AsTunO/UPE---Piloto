let count = 0;

function createGraph(data, average, student) {

    count++;
    if(count <= 3) {
        const contagemDatas = [];

        for (const evento of data.dotsContent) {
            const dataEvento = evento.date;

            // Verifica se a data já existe no array
            const index = contagemDatas.findIndex(item => item.date === dataEvento);

            // Se a data já existir, incrementa a contagem, senão, adiciona um novo objeto ao array
            if (index !== -1) {
                contagemDatas[index].total += 1;
            } else {
                contagemDatas.push({ date: dataEvento, total: 1, currentXPosition: 1 });
            }
        }


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

            let bgstudentcolor

            if(average == 0) {
                bgstudentcolor = "#FF0000"
            }else if (average == 2.5) {
                bgstudentcolor = "#FFA500"
            }else if (average == 5) {
                bgstudentcolor = "#FFF000"
            }else if (average == 7.5) {
                bgstudentcolor = "#90EE90"
            }else {
                bgstudentcolor = "#008000"
            }

            // Adiciona um grupo (g) para conter o retângulo e o texto
            let studentGroup = svgLine.append("g");

            studentGroup.append("rect") // Adiciona um retângulo como background
                .attr("x", 0) // Posiciona o retângulo à esquerda do texto
                .attr("y", 25) // Posiciona o retângulo acima do texto (ajuste conforme necessário)
                .attr("width", 100) // Largura do retângulo (ajuste conforme necessário)
                .attr("height", 20) // Altura do retângulo (ajuste conforme necessário)
                .style("fill", bgstudentcolor); // Preenche o retângulo com a cor de fundo

            studentGroup.append("text")
                .text(`${student}`) // Adiciona o nome do aluno e a média como texto
                .attr("x", 5) // Adiciona uma margem de 5px à esquerda
                .attr("y", 40) // Posiciona a nota abaixo do nome (ajuste conforme necessário)
                .style("text-anchor", "start") // Alinha o texto à esquerda
                .style("font-size", "12px")
                .style("fill", "black");

            // Adicione um grupo para conter o ícone de lixeira
            const trashIconGroup = svgLine.append("g")
            .attr("class", "trash-icon")
            .attr("transform", "translate(" + (width - 30) + "," + (margin.top + 10) + ")")
            .style("cursor", "pointer")
            .on("click", () => {
                // Lógica para excluir o gráfico aqui
                d3.select("#lineChart").select("svg").remove();
                count--; // Resetar a contagem
            });

            // Adicione o ícone de lixeira ao grupo
            trashIconGroup.append("text")
            .attr("y", 10)
            .attr("class", "fa-solid")
            .style("font-size", "20px")
            .style("fill", "#FF0000") // Cor do ícone de lixeira (pode ajustar conforme necessário)
            .text("\uf2ed"); // Código Unicode para o ícone de lixeira
        

            let LinePositions = [];

svgLine.append("g")
    .selectAll("dot")
    .data(data.dotsContent)
    .join("g")
    .attr("class", "dot") 
    .attr("transform", d => {
        let currentXPosition = x(d.date);
        let currentYPosition = y(d.event);

        const matchingDate = contagemDatas.find(currentDate => currentDate.date === d.date && currentDate.total > 1);

        if (matchingDate) {
            const totalIcons = matchingDate.total;
            const iconIndex = matchingDate.currentXPosition;
            const offset = 20;

            if (totalIcons > 2) {
                if (iconIndex < 3) {
                    currentXPosition = currentXPosition - (3 - iconIndex) * offset;
                } else if (iconIndex === 3) {
                } else {
                    currentXPosition = currentXPosition + (iconIndex - 3) * offset;
                }

                matchingDate.currentXPosition++;
            }
        }

        // Certifique-se de que x e y são números válidos
        if (!isNaN(currentXPosition) && !isNaN(currentYPosition)) {
            LinePositions.push({x: currentXPosition, y: currentYPosition});
        }

        return `translate(${currentXPosition},${currentYPosition})`;
    })
    .each(function(d) {
        const g = d3.select(this);

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
            
    console.log(LinePositions)
        }else {
            console.log("Máximo")
        }
}

export default createGraph
