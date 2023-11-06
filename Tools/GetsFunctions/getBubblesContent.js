import epochToDate from "../DateFunctions/epochToDate.js";
import getUserGrade from "../GetsFunctions/getUserGrade.js";

function getBubblesContent(DATASTORE, bubbleStructureData) {

    let bubblesData = bubbleStructureData

    DATASTORE.logs.forEach((current) => {
        if (current.event != "forum_followup" && current.event != "message_read" && current.event != "message_sent") {
            const eventDate = d3.timeFormat("%A, %d")(epochToDate(current.t));
            const matchingBubble = bubbleStructureData.find((currentBubble) => {
                return current.event == currentBubble.event && eventDate == currentBubble.date;
            });
            if (matchingBubble) {
                if (!(matchingBubble.ids).includes(current.userid)) {
                    matchingBubble.totalCases += 1
                    let auxGrade = getUserGrade(current.userid, DATASTORE.quizGrades);
                    matchingBubble.grades.push({ id: current.userid , grade: auxGrade})
                    matchingBubble.totalSumOfGrades += auxGrade
                    matchingBubble.ids.push(current.userid)
                }
            }
        }
    });

    return bubblesData;
}

export default getBubblesContent