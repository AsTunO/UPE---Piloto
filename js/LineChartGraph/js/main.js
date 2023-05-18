import generateGraph from './Tools/AuxFunctions/generateGraph.js';
import populateSelect from './Tools/AuxFunctions/populateSelect.js';

function lineChart(studentsIDs) {

    console.log(studentsIDs)

    // Populate Selects
    Promise.all([
        d3.csv("../data/see_course2060_quiz_list.csv"), 
        d3.csv("../data/user_list_see.csv")])
    .then(data => {   
        let listOfStudents = []
        studentsIDs.forEach(student => {
            const current = data[1].find(obj => obj.userid === student.id);
            if(current) {
                listOfStudents.push(current)
            }
        });
        populateSelect(data[0], "activities-line", "id", "name")
        populateSelect(listOfStudents, "students-line", "userid", "name")
    })
    
    const selectorStudents = document.getElementById('students-line');
    const selectorActivities = document.getElementById('activities-line');
    
    function updateFields() {
    
        let student = {
            id : selectorStudents.options[selectorStudents.selectedIndex].id,
            name: selectorStudents.options[selectorStudents.selectedIndex].text
        }
        let activity = selectorActivities.selectedIndex
    
        generateGraph(student, activity)
    }
    
    selectorStudents.addEventListener('change', () => updateFields())
    selectorActivities.addEventListener('change', () => updateFields())
}

export default lineChart