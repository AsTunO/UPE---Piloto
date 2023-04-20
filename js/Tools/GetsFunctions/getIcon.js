function getIcon(event) {

    let icon = null

    const iconList = [
        { text: "course_vis", unicode: "\uf245", color: "#8d6e63", legend : "O aluno fez a visualização do curso"},
        { text: "resource_vis", unicode: "\uf07c", color: "#e64a19", legend : "O aluno fez a visualização dos recursos"},
        { text: "forum_vis", unicode: "\uf086", color: "#ff94c2", legend: "O aluno fez a visualização do forum"},
        { text: "forum_participation", unicode: "\uf7f5", color: "#00bcd4", legend: "O aluno participou do forum"},
        { text: "assignment_vis", unicode: "\uf15c", color: "#00897b", legend: "O aluno fez a visualização da atividade"},
        { text: "assignment_try", unicode: "\uf00c", color: "#819ca9", legend: "O aluno tentou realizar a atividade"},
        { text: "assignment_sub", unicode: "\uf560", color: "#c0ca33", legend: "O aluno submeteu a atividade"}
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