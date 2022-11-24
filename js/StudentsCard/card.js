import createGraph from '../LineChart/graph.js';
import populateSelectStudents from '../Tools/AuxFunctions/populateSelectStudents.js';
import populateSelectFilters from '../Tools/AuxFunctions/populateSelectFilters.js';
import filterByPeriod from '../Tools/FiltersFunctions/filterByPeriod.js';
import getDomainsContent from '../Tools/GetsFunctions/getDomainsContent.js'
import sortEventByTime from '../Tools/SortsFunctions/sortEventsByTime.js'
import getUserData from '../Tools/GetsFunctions/getUserData.js'
import setUserGrade from '../Tools/SetsFunction/setUserGrade.js'


populateSelectStudents("./data/user_list_see.csv")

Promise.all([
    d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
    d3.csv("./data/event_mapping.csv"),
    d3.csv("./data/see_course2060_quiz_grades.csv"),
    d3.csv("./data/see_course2060_quiz_list.csv")
]).then(function (data) {

    const logs_filtered_data = data[0]
    const event_mapping_data = data[1]
    const logs_grades = data[2]
    const quiz_list = data[3]

    populateSelectFilters(quiz_list)


    const logs_filtered_by_period = []
    logs_filtered_data.forEach((d) => {
        if(filterByPeriod(d)) {
            logs_filtered_by_period.push(d)
        }
    })

    sortEventByTime(logs_filtered_by_period)
    
    const domainsContent = getDomainsContent(event_mapping_data, logs_filtered_by_period)

    // Default Student
    let user = { id: "239", text: "Isabelle Santos"}; 
    let userData = getUserData(logs_filtered_by_period, event_mapping_data,logs_grades, user)

    setUserGrade(userData[userData.length - 1])
    createGraph(domainsContent, userData);

    const tagGraph = document.getElementById('student-name-graph');
    const tagGrade = document.getElementById('student-name-grade');
    const selector = document.getElementById('students');
    selector.addEventListener('change', function () {

        tagGraph.textContent = selector.options[selector.selectedIndex].text;
        tagGrade.textContent = selector.options[selector.selectedIndex].text;
        
        user.id = selector.options[selector.selectedIndex].id
        user.text = selector.options[selector.selectedIndex].text

        userData = getUserData(logs_filtered_by_period, event_mapping_data, logs_grades, user)

        setUserGrade(userData[userData.length - 1])
        createGraph(domainsContent, userData);

    });

})