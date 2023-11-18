import filterQuizGradesByActivity from "../FiltersFunctions/filterQuizGradesByActivity.js";

function generalHistogramActivityData(DATASTORE, activity) {

    let finalData = []

    DATASTORE.quizGrades = filterQuizGradesByActivity(DATASTORE.quizGrades, DATASTORE.quizList[activity].id)

    const logsFiltered = _.groupBy(DATASTORE.quizGrades, 'student_grade');

    for(let currentStack in logsFiltered) {
        logsFiltered[currentStack].forEach(e => {
            finalData.push({id: e.userid, grade: (currentStack*5)})
        })
    }

    return finalData

}

export default generalHistogramActivityData