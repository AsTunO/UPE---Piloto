import getUserGrade from "./GetsFunctions/getUserGrade.js"
import generateHistogram from "./Histogram/generateHistogram.js";

Promise.all([
    d3.csv("../data/user_list_see.csv"),
    d3.csv("../data/see_course2060_quiz_grades.csv")
]).then((data) => {
    let dataToBeUsed = []
    data[0].forEach(e => {  
        if(e.userid < 30000) {
            dataToBeUsed.push(e)
        }
    });

    let dataToBePlotted = []

    dataToBeUsed.forEach(user => {
        dataToBePlotted.push({
            id : user.userid,
            grade: getUserGrade(user.userid, data[1])
        })
    })

    const finalData = dataToBePlotted.reduce((grupos, aluno) => {
        const nota = aluno.grade;
        if (!grupos[nota]) {
            grupos[nota] = [];
        }
        grupos[nota].push(aluno);
        return grupos;
    }, {});

    let histogramData = []
    
    for(const key in finalData) {
        histogramData.push({
            average : key,
            ids : finalData[key],
            len: finalData[key].length
        })
    }

    generateHistogram(histogramData)

})