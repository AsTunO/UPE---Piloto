function generateTooltip(iconInfo) {

    const description = {
        "fa-mouse-pointer" : "Visualização do curso",
        "fa-folder-open" : "Visualização do recurso",
        "fa-comments" : "Visualização do forum", 
        "fa-comment-medical" : "Participação do forum",
        "fa-file-alt" : "Visualização da atividade",
        "fa-check" : "Tentativa da atividade",
        "fa-check-double" : "Entrega da atividade"
    }

    let tooltipContent = description[iconInfo]

    // Criar um elemento para o balão
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    tooltipElement.textContent = tooltipContent;

    // Adicionar o balão ao corpo do documento
    document.body.appendChild(tooltipElement);

    // Remover o balão após algum tempo (por exemplo, 3 segundos)
    setTimeout(() => {
        tooltipElement.remove();
    }, 3000); // 3000 milissegundos = 3 segundos


}

export default generateTooltip