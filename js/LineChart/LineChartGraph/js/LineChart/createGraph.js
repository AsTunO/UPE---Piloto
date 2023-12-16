import controller from "./controller.js";

let graphID = 0;
let graphs = {};

function createGraph(data, student) {

    const diasDaSemana = {
        'Monday': 'Segunda-feira',
        'Tuesday': 'Terça-feira',
        'Wednesday': 'Quarta-feira',
        'Thursday': 'Quinta-feira',
        'Friday': 'Sexta-feira',
        'Saturday': 'Sábado',
        'Sunday': 'Domingo'
    };

    let average = data.grade
    if (average == null) {
        average = 0
    }

    if (!(controller.consult(student.id))) {
        let currentCount = controller.showCount()
        if (currentCount <= 3) {
            generate(data, student)
        } else {
            controller.setCountFull()
        }
    }

    function generate(data, student) {
        graphID = student.id
        controller.add(graphID)
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
            height = 160

        const svgLine = d3.select("#lineChart")
            .append("svg")
            .attr("id", `graph-${graphID}`)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        graphs[graphID] = svgLine;

        let graphGroup = svgLine.append("g")
            .attr("class", `graph-group-${graphID}`);

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

        let bgstudentcolor = "#f6fafa"

        if (average == 0) {
            bgstudentcolor = "#FF0000"
        } else if (average == 2.5) {
            bgstudentcolor = "#FFA500"
        } else if (average == 5) {
            bgstudentcolor = "#FFF000"
        } else if (average == 7.5) {
            bgstudentcolor = "#90EE90"
        } else {
            bgstudentcolor = "#008000"
        }

        // Adiciona um grupo (g) para conter o retângulo e o texto
        let studentGroup = svgLine.append("g");

        // Adiciona um foreignObject para conter a div com o nome
        const fo = studentGroup.append("foreignObject")
            .attr("x", 20) // Posiciona a div à esquerda do ícone
            .attr("y", 15) // Posiciona a div acima do ícone
            .attr("width", 80) // Largura da div (ajuste conforme necessário)
            .attr("height", 50); // Altura da div (ajuste conforme necessário)

        // Adiciona um elemento div dentro do foreignObject para o nome do aluno
        const div = fo.append("xhtml:div")
            .style("width", "55px")
            .style("font-size", "12px")
            .style("color", "black")
            .style("background-color", bgstudentcolor)
            .style("text-align", "center")
            .text(`${student.name}`);

        /*if(datumBubble != undefined) {
        // Adiciona um grupo para conter o ícone de informação e o texto
        let infoGroup = svgLine.append("g");
        
        // Adiciona o ícone de informação do Font Awesome usando unicode
        infoGroup.append("text")
            .attr("x", 5) // Posiciona o ícone à esquerda da div
            .attr("y", 35) // Posiciona o ícone na mesma linha vertical da div
            .attr("class", "fa-solid")
            .style("font-size", "10px") // Define o tamanho do ícone
            .text("\uf05a"); // Unicode do ícone de informação do Font Awesome
        
            infoGroup.on("mouseover", function() {
                const tooltip = svgLine.append("g")
                    .attr("class", "tooltip-info")
                    .attr("transform", "translate(10, 60)"); // Posição do retângulo de tooltip
    
                    let descriptionInfo 
                    let diaInfoNum
                    let diaInfo
                    if(datumBubble != undefined){
                
                        diaInfo = datumBubble["date"].split(",")[0];
                        diaInfoNum = datumBubble["date"].split(",")[1];
                        diaInfo = (diasDaSemana[diaInfo])
                    
                         descriptionInfo = mapEvent[datumBubble.event]
                    }
            
                const textContent = `${descriptionInfo} no dia ${diaInfoNum}, ${diaInfo}`;
            
                const text = tooltip.append("text")
                    .text(textContent)
                    .attr("x", 5)
                    .attr("y", -60)
                    .style("font-size", "12px")
                    .style("font-weight", "bold")
                    .style("fill", "black");
            
                // Obtém as dimensões do texto para definir o tamanho do retângulo
                const textBBox = text.node().getBBox();
            
                // Adiciona um retângulo no fundo do texto com a cor cinza
                tooltip.insert("rect", "text")
                    .attr("x", textBBox.x - 4) // Ajuste de margem
                    .attr("y", textBBox.y - 4) // Ajuste de margem
                    .attr("width", textBBox.width + 8) // Ajuste de margem
                    .attr("height", textBBox.height + 8) // Ajuste de margem
                    .attr("fill", "lightgrey"); // Cor cinza
            
                // Adiciona um evento de mouseout para remover o tooltip quando o mouse sair do ícone
                infoGroup.on("mouseout", function() {
                    svgLine.selectAll(".tooltip-info").remove(); // Remove todos os elementos do tooltip
                });
            });
            
    
    }*/

        // Adicione um grupo para conter o ícone de lixeira
        const trashIconGroup = svgLine.append("g")
            .attr("class", "trash-icon")
            .attr("id", `${graphID}`)
            .attr("transform", "translate(" + (width - 30) + "," + (margin.top + 10) + ")")
            .style("cursor", "pointer")
            .on("click", function () {
                const clickedGraphID = d3.select(this).attr("id"); // Pega o ID do elemento clicado
                const graphToRemove = d3.select(`#graph-${clickedGraphID}`); // Seleciona o gráfico com o ID correspondente
                controller.remove(clickedGraphID)
                graphToRemove.remove();

                // Encontrar e desmarcar a caixa de seleção correspondente
                const studentsList = document.getElementById("students-list");
                const checkboxes = studentsList.querySelectorAll("input[type='checkbox']");

                checkboxes.forEach(checkbox => {
                    if (checkbox.value === clickedGraphID) {
                        checkbox.checked = false;
                    }
                });
            });

        // Adicione o ícone de lixeira ao grupo
        trashIconGroup.append("text")
            .attr("y", 10)
            .attr("class", "fa-solid")
            .style("font-size", "20px")
            .style("fill", "#FF0000") // Cor do ícone de lixeira (pode ajustar conforme necessário)
            .text("\uf2ed"); // Código Unicode para o ícone de lixeira


        let LinePositions = [];

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

    const description = {
        "fa-mouse-pointer" : "Visualização do curso",
        "fa-folder-open" : "Visualização do recurso",
        "fa-comments" : "Visualização do forum", 
        "fa-comment-medical" : "Participação do forum",
        "fa-file-alt" : "Visualização da atividade",
        "fa-check" : "Tentativa da atividade",
        "fa-check-double" : "Entrega da atividade"
    }

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
                    LinePositions.push({ x: currentXPosition, y: currentYPosition, date: d.date });
                }

                return `translate(${currentXPosition},${currentYPosition})`;
            })
            .each(function (d) {
                const g = d3.select(this);

                g.append("circle")
                    .attr("r", 12)
                    .style("fill", "#f6fafa");

                g.append("text")
                    .attr("class", "fa-solid")
                    .style("font-size", "20px")
                    .style("fill", d => d["icon"].color)
                    .text(d => d["icon"].unicode)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    // Adicione tooltips aqui
                .on("mouseover", function(event, d) {
                    tooltip.style("opacity", 1)
                        .html(d.icon["legend"])
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 30) + "px");
                })
                .on("mouseout", function() {
                    tooltip.style("opacity", 0);
                });;
            });

        // Rola a tela para baixo após a geração do gráfico
        const scrollTarget = document.getElementById('scrollTarget');
        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

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

        for (let i = 0; i < xVerticalMargins.length; i++) {
            if (i % 2 == 0) {
                xVerticalMargins[i] = { x: xVerticalMargins[i].x - 15 }
            } else {
                xVerticalMargins[i] = { x: xVerticalMargins[i].x + 15 }
            }
        }

        xVerticalMargins.forEach(coordenada => {
            // Adiciona linhas verticais tracejadas
            svgLine.append("line")
                .attr("x1", coordenada.x)
                .attr("y1", 0)
                .attr("x2", coordenada.x)
                .attr("y2", height - 15)
                .attr("stroke", "black")
                .attr("opacity", 0.3)
                .attr("stroke-dasharray", "5,5"); // Define o estilo tracejado
        })
        console.log(xVerticalMargins)
    }


}

export default createGraph