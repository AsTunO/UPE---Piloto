import epochToDate from "../DateFunctions/epochToDate.js"

function filterData(logs, eventMapping, domainContent) {
    
    let result = []

    domainContent.y.forEach((xi) => {
        domainContent.x.forEach((yi) => {
            result.push({event: xi, date: yi, tot: 0})
        })
    })

    logs.forEach((current) => {
        eventMapping.forEach((event) => {
            if (current.component == event.component && current.action == event.action && current.target == event.target) {
                if (event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
                    result.forEach((c) => {
                        if ((event.class == c.event) && (d3.timeFormat("%A, %d")(epochToDate(current.t)) == c.date)) {
                            c.tot += 1
                        }
                    })
                }
            }
        })
    })

    return result
}

export default filterData