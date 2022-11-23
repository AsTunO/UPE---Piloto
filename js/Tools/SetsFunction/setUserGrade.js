function setUserGrade(userGrade) {

    const grade_text = document.getElementById('student-grade-content');
    grade_text.textContent = userGrade.grade

}

export default setUserGrade