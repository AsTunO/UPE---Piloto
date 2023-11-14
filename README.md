https://teste--ephemeral-zabaione-4110e5.netlify.app


// Desenha linhas conectando todos os pontos
for (let i = 0; i < LinePositions.length - 1; i++) {
    svgLine.append("line")
      .attr("x1", LinePositions[i].x)
      .attr("y1", LinePositions[i].y)
      .attr("x2", LinePositions[i + 1].x)
      .attr("y2", LinePositions[i + 1].y)
      .style("stroke", "black");
  }
    
