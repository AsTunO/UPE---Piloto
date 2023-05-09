import filterByUser from "../FiltersFunctions/filterByUser.js"
import mapRange from "../AuxFunctions/mapRange.js"

function getUserGrade(user, quizGrades) {

    let grade = 0

    quizGrades.forEach((rawData) => {
        if (filterByUser(rawData, user)) {
            grade = mapRange(parseFloat(rawData.student_grade))
        }
    });

    return grade
    
}

export default getUserGrade