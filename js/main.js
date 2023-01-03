import populateSelectFilters from "./Functions/Aux/populateSelectFilters.js"
import updateGraph from "./Functions/Update/updateGraph.js"
import getPeriod from "./Functions/Gets/getPeriod.js"
import filterByPeriod from "./Functions/Filters/filterByPeriod.js"
import sortEventsByTime from "./Functions/Sorts/sortEventsByTime.js"
import getDomainsContent from "./Functions/Gets/getDomainsContent.js"

Promise.all([
    d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
    d3.csv("./data/event_mapping.csv"),
    d3.csv("./data/see_course2060_quiz_list.csv"),
    d3.csv("./data/user_list_see.csv")
]).then(function (data) {

    const logs_filtered = data[0]
    const event_mapping = data[1]
    const quiz_list = data[2]
    const users = data[3]

    let activities = populateSelectFilters(quiz_list)

    const activities_period = []

    activities.forEach((e) => {
        e = e.text
        let period = getPeriod(e, quiz_list)
        activities_period.push({ text: e, period: period })
    })

    const logs_filtered_by_period_and_activity = []

    activities_period.forEach((e) => {
        const logs_filtered_by_period = []
        logs_filtered.forEach((d) => {
            if (filterByPeriod(d, e.period)) {
                logs_filtered_by_period.push(d)
            }
        })
        sortEventsByTime(logs_filtered_by_period)
        logs_filtered_by_period_and_activity.push({ activity: e.text, logs: logs_filtered_by_period })
    })


    // Default Graph

    let activity = "Atividade 1"
    let logs_selected = logs_filtered_by_period_and_activity[0].logs
    let domainsContent = getDomainsContent(logs_selected)

    const selectorActivities = document.getElementById('activities');

    selectorActivities.addEventListener('change', () => updateGraph(selectorActivities, logs_filtered, event_mapping))

})