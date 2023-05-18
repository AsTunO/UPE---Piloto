import filterByUser from "../FiltersFunctions/filterByUser.js"
import mapRange from "../AuxFunctions/mapRange.js"

function getUserGrade(user, quizGrades) {

    let studentGrade = null

    quizGrades.forEach(current => {
        if(filterByUser(current, user)) {
            studentGrade = mapRange(current.student_grade);
        }
    })

    return studentGrade
}

export default getUserGrade