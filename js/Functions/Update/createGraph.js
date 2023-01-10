import epochToDate from '../Date/epochToDate.js';
import getDomainsContent from '../Gets/getDomainsContent.js';
import generateGraph from '../../LineChart/generateGraph.js';

function createGraph(selectorActivities, logs_filtered_by_period_and_activity, event_mapping, users) {


    let activity = selectorActivities.options[selectorActivities.selectedIndex].text

    let logs_to_be_worked
    logs_filtered_by_period_and_activity.forEach((current_log_filtered_by_period_and_activity) => {
        if(current_log_filtered_by_period_and_activity.activity == activity){
            logs_to_be_worked = current_log_filtered_by_period_and_activity.logs
        }
    })

    
    let domainsContent = getDomainsContent(logs_to_be_worked)

    let all_users_ways = []
    users.forEach((user) => {
        let userData = []
        let auxEventList = []
        logs_to_be_worked.forEach((current_data) => {
            if(user.userid == current_data.userid) {
                event_mapping.forEach((event) => {
                if (current_data.component == event.component && current_data.action == event.action && current_data.target == event.target) {
                    if (event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
                        if ((auxEventList.length == 0) || !auxEventList.includes(event.class)) { // Remove equals events
                            auxEventList.push(event.class)
                            userData.push({
                                date: d3.timeFormat("%A, %d")(epochToDate(current_data.t)),
                                event: event.class
                            })
                        }
                    }
                }
            });
            }
        })
        all_users_ways.push(userData)
    })


    generateGraph(domainsContent, all_users_ways)
}

export default createGraph