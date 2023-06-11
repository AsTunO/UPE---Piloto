function filterQuizGradesByActivity(quizGrades, activityID) {
    return quizGrades.filter(element => element.id === activityID)
}
export default filterQuizGradesByActivity