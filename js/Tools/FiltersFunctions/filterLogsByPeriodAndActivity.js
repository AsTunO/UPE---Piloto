import getPeriod from "../GetsFunctions/getPeriod.js"
import filterByPeriod from "./filterByPeriod.js"
import sortEventByTime from "../SortsFunctions/sortEventsByTime.js"
import getDomainsContent from "../GetsFunctions/getDomainsContent.js"

function filterLogsByPeriodAndActivity(logs, activities, quiz_list) {

    const activitiesPeriod = []

    activities.forEach((e) => {
        e = e.text
        let period = getPeriod(e, quiz_list)
        activitiesPeriod.push({ text: e, period: period })
    })

    const logsFilteredByPeriodAndActivity = []

    activitiesPeriod.forEach((e) => {
        const logsFilteredByPeriod = []
        logs.forEach((d) => {
            if (filterByPeriod(d, e.period)) {
                logsFilteredByPeriod.push(d)
            }
        })
        sortEventByTime(logsFilteredByPeriod)
        logsFilteredByPeriodAndActivity.push({ activity: e.text, logs: logsFilteredByPeriod, domainContent: getDomainsContent(logsFilteredByPeriod)})
    })

    return logsFilteredByPeriodAndActivity

}

export default filterLogsByPeriodAndActivity