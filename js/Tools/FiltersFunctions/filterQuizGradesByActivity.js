function filterQuizGradesByActivity(quizGrades, activityID) {
    console.log(activityID)
    return quizGrades.filter(element => element.id === activityID)
}
export default filterQuizGradesByActivity