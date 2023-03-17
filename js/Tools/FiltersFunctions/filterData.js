import epochToDate from "../DateFunctions/epochToDate.js"

function filterData(logs, eventMappign) {
    
    let result = []

    logs.forEach((current) => {
        eventMappign.forEach((event) => {
            if (current.component == event.component && current.action == event.action && current.target == event.target) {
                if (event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
                    result.push([event.class, d3.timeFormat("%A, %d")(epochToDate(current.t))])
                }
            }
        })
    })
    return result
}

export default filterData