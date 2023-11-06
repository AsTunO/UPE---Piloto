import sortEventsByTime from "../SortsFunctions/sortEventsByTime.js";
import filterLogsByActivity from "./filterLogsByActivity.js";
import getDomainsContent from "../GetsFunctions/getDomainsContent.js";
import filterQuizGradesByActivity from "./filterQuizGradesByActivity.js";
import getDotsContent from "../GetsFunctions/getDotsContent.js";

function filterData(DATASTORE, student, activity) {

    let dataToBePlotted = {
        domainContent: null,
        dotsContent: null
    };

    DATASTORE.logs = sortEventsByTime(filterLogsByActivity(DATASTORE.logs, DATASTORE.quizList[activity]));
    DATASTORE.quizGrades = filterQuizGradesByActivity(DATASTORE.quizGrades, DATASTORE.quizList[activity].id);

    dataToBePlotted.domainContent = getDomainsContent(DATASTORE.quizList[activity]);
    dataToBePlotted.dotsContent = getDotsContent(DATASTORE, student);

    return dataToBePlotted;

}

export default filterData;