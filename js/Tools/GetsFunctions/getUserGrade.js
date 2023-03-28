import filterByUser from "../FiltersFunctions/filterByUser.js"

function getUserGrade(user, DATASTORE) {

    let userGrades = []

    DATASTORE.quizGrades.forEach((rawData) => {
        if (filterByUser(rawData, user)) {
            userGrades.push(parseFloat(rawData.student_grade))
        }
    });
    const reducer = (accumulator, current) => accumulator + current

    var userGrade = userGrades.length != 0 ? userGrades.reduce(reducer) : 0 // Verify if the user has any activity

    return userGrade
}

export default getUserGrade