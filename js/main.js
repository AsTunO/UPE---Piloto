import generateGraph from './Tools/AuxFunctions/generateGraph.js';
import populateSelect from './Tools/AuxFunctions/populateSelect.js';

let student = { id: "239", name: "Isabelle Santos" }
let student2 = {id: '7184', name: 'Marisa Rodrigues'}
let student3 = {id: '438', name: 'Júlio Araujo'}
let activity = 0

generateGraph(student, activity, true)
generateGraph(student2, activity, true)
generateGraph(student3, activity, false)

// Populate Selects
Promise.all([
    d3.csv("./data/see_course2060_quiz_list.csv"), 
    d3.csv("./data/user_list_see.csv")])
.then(data => {   
    populateSelect(data[0], "activities", "id", "name")
    populateSelect(data[1], "students", "userid", "name")
})

const selectorStudents = document.getElementById('students');
const selectorActivities = document.getElementById('activities');
const tagGraph = document.getElementById('student-name-graph');
const tagGrade = document.getElementById('student-name-grade');

function updateFields() {

    tagGraph.textContent = selectorStudents.options[selectorStudents.selectedIndex].text;
    tagGrade.textContent = selectorStudents.options[selectorStudents.selectedIndex].text;

    student = {
        id : selectorStudents.options[selectorStudents.selectedIndex].id,
        name: selectorStudents.options[selectorStudents.selectedIndex].text
    }
    activity = selectorActivities.selectedIndex

    generateGraph(student, activity)
}

selectorStudents.addEventListener('change', () => updateFields())
selectorActivities.addEventListener('change', () => updateFields())
