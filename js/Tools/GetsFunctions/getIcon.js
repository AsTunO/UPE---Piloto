function getIcon(event) {

    let icon = null

    const iconList = [
        { text: "course_vis", unicode: "\uf06e", color: "#FF0000", legend : "O aluno fez a visualização do curso"},
        { text: "resource_vis", unicode: "\uf06e", color: "#FFFF00", legend : "O aluno fez a visualização dos recursos"},
        { text: "forum_vis", unicode: "\uf06e", color: "#0000FF", legend: "O aluno fez a visualização do forum"},
        { text: "forum_participation", unicode: "\uf500", color: "#808080", legend: "O aluno participou do forum"},
        { text: "assignment_vis", unicode: "\uf06e", color: "#993399", legend: "O aluno fez a visualização da atividade"},
        { text: "assignment_try", unicode: "\uf00c", color: "#0000FF", legend: "O aluno tentou realizar a atividade"},
        { text: "assignment_sub", unicode: "\uf560", color: "#008000", legend: "O aluno submeteu a atividade"}
    ]

    iconList.forEach(current => {
        if(current.text == event) {
            icon = {
                unicode : current.unicode, 
                color : current.color, 
                legend : current.legend
            }
        }
    })

    return icon

}

export default getIcon