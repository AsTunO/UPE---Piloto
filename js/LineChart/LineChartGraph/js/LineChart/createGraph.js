let count = 0;
let LASTStudentID = null

function createGraph(data, average, student) {

    if(LASTStudentID == null) {
        LASTStudentID = student.id
        generate()
    }else if(LASTStudentID != student.id) {
        generate()
        LASTStudentID = student.id
    }

    
    function generate() {

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
    
    
                const margin = { top: 10, right: 150, bottom: 60, left: 20 },
                    width = window.innerWidth - margin.right,
                    height = 150
            
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
        
                // Desenha linhas tracejadas verticais no início e no final de cada dia da semana no eixo X
    /*// Desenha linhas tracejadas verticais no início e no final de cada dia da semana no eixo X
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    weekdays.forEach(day => {
        const firstXPosition = x(`${day}, 0`);
        const lastXPosition = x(`${day}, 1`) + x.bandwidth();
    
        svgLine.append("line")
            .attr("x1", firstXPosition)
            .attr("y1", 0) // Início da linha no topo do gráfico
            .attr("x2", firstXPosition)
            .attr("y2", height) // Fim da linha na parte inferior do gráfico
            .style("stroke", "black")
            .style("stroke-dasharray", "4") // Define o tracejado
            .style("stroke-width", 1);
        
        svgLine.append("line")
            .attr("x1", lastXPosition)
            .attr("y1", 0) // Início da linha no topo do gráfico
            .attr("x2", lastXPosition)
            .attr("y2", height) // Fim da linha na parte inferior do gráfico
            .style("stroke", "black")
            .style("stroke-dasharray", "4") // Define o tracejado
            .style("stroke-width", 1);
    });*/
    
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
    
                let bgstudentcolor = "#ffffff"
    
                /*if(average == 0) {
                    bgstudentcolor = "#FF0000"
                }else if (average == 2.5) {
                    bgstudentcolor = "#FFA500"
                }else if (average == 5) {
                    bgstudentcolor = "#FFF000"
                }else if (average == 7.5) {
                    bgstudentcolor = "#90EE90"
                }else {
                    bgstudentcolor = "#008000"
                }*/
    
                // Adiciona um grupo (g) para conter o retângulo e o texto
                let studentGroup = svgLine.append("g");
    
                studentGroup.append("rect") // Adiciona um retângulo como background
                    .attr("x", 0) // Posiciona o retângulo à esquerda do texto
                    .attr("y", 25) // Posiciona o retângulo acima do texto (ajuste conforme necessário)
                    .attr("width", 100) // Largura do retângulo (ajuste conforme necessário)
                    .attr("height", 20) // Altura do retângulo (ajuste conforme necessário)
                    .style("fill", bgstudentcolor); // Preenche o retângulo com a cor de fundo
    
                studentGroup.append("text")
                    .text(`${student.name}`) // Adiciona o nome do aluno e a média como texto
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
                    count = count - 1; // Resetar a contagem
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
                LinePositions.push({x: currentXPosition, y: currentYPosition, date: d.date});
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
    
        /// Desenha linhas conectando todos os pontos 
    for (let i = 0; i < LinePositions.length - 1; i++) {
        const iconRadius = 15; // Raio dos ícones
        const xOffset = LinePositions[i + 1].x - LinePositions[i].x;
        const yOffset = LinePositions[i + 1].y - LinePositions[i].y;
        const distance = Math.sqrt(xOffset * xOffset + yOffset * yOffset);
        const unitX = xOffset / distance;
        const unitY = yOffset / distance;
    
        const startX = LinePositions[i].x + unitX * iconRadius; // Afasta a linha do ícone
        const startY = LinePositions[i].y + unitY * iconRadius;
        const endX = LinePositions[i + 1].x - unitX * iconRadius;
        const endY = LinePositions[i + 1].y - unitY * iconRadius;
    
        svgLine.append("line")
        .attr("x1", startX)
        .attr("y1", startY)
        .attr("x2", startX) // Comece com as linhas na mesma posição do ponto anterior
        .attr("y2", startY) // Comece com as linhas na mesma posição do ponto anterior
        .style("stroke", "black")
        .style("stroke-width", 1.2)
        .transition() // Adicione a transição para a animação
        .delay(200) // Ajuste o atraso para cada linha aparecer
        .duration(800) // Ajuste a duração da animação
        .attr("x2", endX) // Altere a posição final da linha
        .attr("y2", endY); // Altere a posição final da linha
    }

    console.log(LinePositions)

    function getFirstAndLastEvents(linePositions) {
        const eventsByDate = {};
        
        // Agrupando os eventos por data
        linePositions.forEach(event => {
          if (!eventsByDate[event.date]) {
            eventsByDate[event.date] = [];
          }
          eventsByDate[event.date].push(event);
        });
        
        // Construindo o array NewDate com o primeiro e último evento de cada data
        const newDate = [];
        for (const date in eventsByDate) {
          const events = eventsByDate[date];
          newDate.push(events[0]); // Adiciona o primeiro evento da data
          newDate.push(events[events.length - 1]); // Adiciona o último evento da data
        }
        
        return newDate;
      }

    let xVerticalMargins = getFirstAndLastEvents(LinePositions)

    for(let i = 0; i < xVerticalMargins.length; i++) {
        if(i % 2 == 0) {
            xVerticalMargins[i] = {x: xVerticalMargins[i].x - 15}
        }else {
            xVerticalMargins[i] = {x: xVerticalMargins[i].x + 15}
        }
    }

    xVerticalMargins.forEach(coordenada => {
        // Adiciona linhas verticais tracejadas
        svgLine.append("line")
        .attr("x1", coordenada.x)
        .attr("y1", 0)
        .attr("x2", coordenada.x)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("opacity", 0.3)
        .attr("stroke-dasharray", "5,5"); // Define o estilo tracejado
    })
    



    console.log(xVerticalMargins)
        
            }else {
                count = 3
            }
    }


}

export default createGraph
