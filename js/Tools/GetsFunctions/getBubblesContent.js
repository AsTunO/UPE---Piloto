import epochToDate from "../DateFunctions/epochToDate.js";
import getUserGrade from "../GetsFunctions/getUserGrade.js";

function getBubblesContent(DATASTORE, bubbleStructureData) {

    let bubblesData = bubbleStructureData

    DATASTORE.logs.forEach((current) => {
        const event = DATASTORE.eventMapping.find((event) => {
            return current.component == event.component && current.action == event.action && current.target == event.target;
        });
        if (event && event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
            const eventDate = d3.timeFormat("%A, %d")(epochToDate(current.t));
            const matchingBubble = bubbleStructureData.find((currentBubble) => {
                return event.class == currentBubble.event && eventDate == currentBubble.date;
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