import filterByUser from "../FiltersFunctions/filterByUser.js"
import mapRange from "../AuxFunctions/mapRange.js"

function getUserGrade(user, quizGrades) {

    let studentGrade = null
    console.log(quizGrades)
    console.log(user.id)

    quizGrades.forEach(current => {
        if(user.id == current.userid) {
            console.log("opa")
            studentGrade = mapRange(current.student_grade);
        }
    })

    console.log(studentGrade)

    return studentGrade
}

export default getUserGrade