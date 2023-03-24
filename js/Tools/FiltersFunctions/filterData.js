import epochToDate from "../DateFunctions/epochToDate.js"
import getUserGrade from "../GetsFunctions/getUserGrade.js"

function filterData(logs, eventMapping, domainContent, firstAccess, logsGrades) {

    let result = []

    domainContent.y.forEach((xi) => {
        domainContent.x.forEach((yi) => {
            result.push({event: xi, date: yi, tot: 0, totSum: 0})
        })
    })

    if(firstAccess === false) {
        logs.forEach((current) => {
            eventMapping.forEach((event) => {
                if (current.component == event.component && current.action == event.action && current.target == event.target) {
                    if (event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
                        result.forEach((c) => {
                            if ((event.class == c.event) && (d3.timeFormat("%A, %d")(epochToDate(current.t)) == c.date)) {
                                c.tot += 1
                                c.totSum += getUserGrade(current.userid, logsGrades)
                            }
                        })
                    }
                }
            })
        })  
    } else {

        let usersAndEvents = []

        logs.forEach((current) => {
            eventMapping.forEach((event) => {
                if (current.component == event.component && current.action == event.action && current.target == event.target) {
                    if (event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
                        result.forEach((c) => {
                            if ((event.class == c.event) && (d3.timeFormat("%A, %d")(epochToDate(current.t)) == c.date)) {
                                let actualCondition = true
                                usersAndEvents.forEach((user) => {
                                    if(user.userid == current.userid && user.event == c.event) {
                                        actualCondition = false
                                    }
                                })
                                if(actualCondition == true){
                                    c.tot += 1
                                    c.totSum += getUserGrade(current.userid, logsGrades)
                                    usersAndEvents.push({userid : current.userid, event: c.event})
                                }   
                            }
                        })
                    }
                }
            })
        })
    }
    

    return result
}

export default filterData