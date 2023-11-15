import generateGraph from './Tools/AuxFunctions/generateGraph.js';
import populateSelect from './Tools/AuxFunctions/populateSelect.js';

function lineChart(studentsIDs, activity, average) {
    const selectorStudents = document.getElementById('students-list');
    selectorStudents.innerHTML = '';

    // Constantes para os caminhos dos arquivos CSV
    const quizListPath = "../data/see_course2060_quiz_list.csv";
    const userListPath = "../data/user_list_see.csv";

    // Função para encontrar estudantes nos arquivos CSV
    function findStudentsInCSV(students, userList) {
        return students.map(student => {
            return userList.find(obj => obj.userid === student.id);
        }).filter(Boolean);
    }

    // Função para atualizar os campos e gerar o gráfico
    function updateFields(selectedAnchor) {
        const student = {
            id: selectedAnchor.getAttribute('data-id'),
            name: selectedAnchor.textContent
        };

        let newAv = average

        generateGraph(student, activity, newAv);
    }

    function handleStudentClick(event) {
        const target = event.target;

        if (target.tagName === 'A') {
            const selectedAnchor = selectorStudents.querySelector('a.selected');
            if (selectedAnchor) {
                selectedAnchor.classList.remove('selected');
            }

            target.classList.add('selected');
            updateFields(target);
        }
    }

    // Adiciona o ouvinte de evento ao seletor de estudantes
    selectorStudents.addEventListener('click', handleStudentClick);

    // Carrega os arquivos CSV e popula o seletor de estudantes
    Promise.all([
        d3.csv(quizListPath),
        d3.csv(userListPath)
    ]).then(data => {
        const [quizList, userList] = data;
        const listOfStudents = findStudentsInCSV(studentsIDs, userList);
        populateSelect(listOfStudents, "students", "userid", "name");

        // Adiciona novamente o ouvinte de evento após a população do seletor
        selectorStudents.addEventListener('click', handleStudentClick);
    });
}

export default lineChart;
