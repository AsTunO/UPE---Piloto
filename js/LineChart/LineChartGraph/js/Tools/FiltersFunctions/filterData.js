import sortEventsByTime from "../SortsFunctions/sortEventsByTime.js";
import filterLogsByActivity from "./filterLogsByActivity.js";
import getDomainsContent from "../GetsFunctions/getDomainsContent.js";
import filterQuizGradesByActivity from "./filterQuizGradesByActivity.js";
import getDotsContent from "../GetsFunctions/getDotsContent.js";
import getUserGrade from "../GetsFunctions/getUserGrade.js";

function filterData(DATASTORE, student, activity) {

    let dataToBePlotted = {
        domainContent: null,
        dotsContent: null, 
        grade: null
    };

    DATASTORE.logs = sortEventsByTime(filterLogsByActivity(DATASTORE.logs, DATASTORE.quizList[activity]));
    DATASTORE.quizGrades = filterQuizGradesByActivity(DATASTORE.quizGrades, DATASTORE.quizList[activity].id);

    dataToBePlotted.domainContent = getDomainsContent(DATASTORE.quizList[activity]);
    dataToBePlotted.dotsContent = getDotsContent(DATASTORE, student);
    dataToBePlotted.grade = getUserGrade(student, DATASTORE.quizGrades)

    console.log(dataToBePlotted)

    return dataToBePlotted;

}

export default filterData;