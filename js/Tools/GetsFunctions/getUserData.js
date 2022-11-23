import filterByUser from '../FiltersFunctions/filterByUser.js'
import epochToDate from '../DateFunctions/epochToDate.js';
import getUserGrade from './getUserGrade.js';

function getUserData(logs_filtered_by_period, event_mapping_data, logs_grades, user) {

    let userData = []
    let auxEventList = []

    logs_filtered_by_period.forEach(function (rawData) {
        if (filterByUser(rawData, user)) {
            event_mapping_data.forEach((event) => {
                if (rawData.component == event.component && rawData.action == event.action && rawData.target == event.target) {
                    if ((auxEventList.length == 0) || !auxEventList.includes(event.class)) { // Remove equals events
                        auxEventList.push(event.class)
                        userData.push({
                            date: d3.timeFormat("%A, %d")(epochToDate(rawData.t)),
                            event: event.class
                        })
                   }
                }
            });
        }
    });

    userData.push({ grade: getUserGrade(user, logs_grades)})
    
    return userData
}

export default getUserData