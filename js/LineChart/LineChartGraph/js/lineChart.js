import generateGraph from './Tools/AuxFunctions/generateGraph.js';
import populateSelect from './Tools/AuxFunctions/populateSelect.js';

function lineChart(studentsIDs, activity, average) {
    
    const selectorStudents = document.getElementById('students-list');
    selectorStudents.innerHTML = '';

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
    //const selectorActivities = document.getElementById('activity');
    
    function updateFields() {
        const selectedAnchor = selectorStudents.querySelector('a.selected');
    
        if (selectedAnchor) {
            const student = {
                id: selectedAnchor.getAttribute('data-id'),
                name: selectedAnchor.textContent
            };
    
            generateGraph(student, activity, average);
        }
    }
    
    function handleStudentClick(event) {
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
    }
    
    // Adiciona o ouvinte de evento ao seletor de estudantes
    selectorStudents.addEventListener('click', handleStudentClick);
}

export default lineChart