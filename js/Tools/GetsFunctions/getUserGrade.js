import filterByUser from "../FiltersFunctions/filterByUser.js"
import mapRange from "../AuxFunctions/mapRange.js"

function getUserGrade(user, quizGrades) {

    

    let userGrades = []

    quizGrades.forEach((rawData) => {
        if (filterByUser(rawData, user)) {
            userGrades.push(mapRange(parseFloat(rawData.student_grade)))
        }
    });
    const reducer = (accumulator, current) => accumulator + current

    var userGrade = userGrades.length != 0 ? userGrades.reduce(reducer) : 0 // Verify if the user has any activity

    return userGrade
}

export default getUserGrade