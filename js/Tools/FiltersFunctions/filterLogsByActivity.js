function filterLogsByActivity(logs, activityInformation) {

    let logsFilteredByActivity = []

    logs.forEach(currentLog => {
        if (currentLog.t >= activityInformation.t_open && currentLog.t <= activityInformation.t_close) {
            logsFilteredByActivity.push(currentLog)
        }
    })

    return logsFilteredByActivity

}

export default filterLogsByActivity