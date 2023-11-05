import generateGraph from './Tools/AuxFunctions/generateGraph.js';
import populateSelect from './Tools/AuxFunctions/populateSelect.js';

function lineChart(studentsIDs, activity) {

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
        //populateSelect(data[0], "activity", "id", "name")
        populateSelect(listOfStudents, "students", "userid", "name")
    })
    
    const selectorStudents = document.getElementById('students-list');
    //const selectorActivities = document.getElementById('activity');
    
    function updateFields() {
    
        let selectedAnchor = selectorStudents.querySelector('a.selected');
        let student = {
            id: selectedAnchor.getAttribute('data-id'),
            name: selectedAnchor.textContent
        }
    
        generateGraph(student, activity)
    }
    
    selectorStudents.addEventListener('click', (event) =>  {
        const target = event.target;
        if (target.tagName === 'A') {
            // Remova a classe "selected" de qualquer outro elemento
            const selectedAnchor = selectorStudents.querySelector('a.selected');
            if (selectedAnchor) {
                selectedAnchor.classList.remove('selected');
            }
            // Adicione a classe "selected" ao elemento clicado
            target.classList.add('selected');
            updateFields();
        }
    })
    //selectorActivities.addEventListener('change', () => updateFields())
}

export default lineChart