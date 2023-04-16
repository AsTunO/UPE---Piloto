import filterByUser from "../FiltersFunctions/filterByUser.js";
import epochToDate from "../DateFunctions/epochToDate.js"
import getIcon from "../GetsFunctions/getIcon.js"

function getDotsContent(DATASTORE, student) {

    let dotsContent = []

    DATASTORE.logs.forEach((current) => {
        const event = DATASTORE.eventMapping.find((event) => {
            return current.component == event.component && current.action == event.action && current.target == event.target;
        });
        if (event && event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
            const eventExists = dotsContent.some((dot) => dot.event === event.class);
            if(filterByUser(current, student) && !(eventExists)) {
                dotsContent.push({
                    date: d3.timeFormat("%A, %d")(epochToDate(current.t)),
                    event: event.class,
                    icon: getIcon(event.class)
                })
            }
        }
    });

    return dotsContent

}

export default getDotsContent;