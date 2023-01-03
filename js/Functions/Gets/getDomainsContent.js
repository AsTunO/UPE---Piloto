import epochToDate from "../Date/epochToDate.js"

function getDomainsContent(logs_filtered_by_period) {

    let domainsContent = {
        x: [],
        y: ["course_vis", "resource_vis", "forum_vis", "forum_participation", "assignment_vis", "assignment_try", "assignment_sub"]
    }

    // Get the period to be worked
    var tempPeriod = []

    logs_filtered_by_period.forEach((e) => {
        tempPeriod.push(d3.timeFormat("%A, %d")(epochToDate(e.t)))
    })

    var period = tempPeriod.filter((current, i) =>
        tempPeriod.indexOf(current) === i
    )

    domainsContent.x = period

    return domainsContent
}

export default getDomainsContent