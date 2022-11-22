import epochToDate from "../DateFunctions/epochToDate.js"

function getDomainsContent(event_mapping_data, logs_filtered_by_period) {

    let domainsContent = {
        x : [],
        y : []
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

    // Get the events
    var event_mapping_class = []

    event_mapping_data.forEach((e) => {
        event_mapping_class.push(e.class)
    })

    var events = event_mapping_class.filter((current, i) =>
        event_mapping_class.indexOf(current) === i
    )

    domainsContent.y = events


    return domainsContent
}

export default getDomainsContent