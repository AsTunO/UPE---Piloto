import controller from './LineChart/controller.js';
import generateGraph from './Tools/AuxFunctions/generateGraph.js';
import populateSelect from './Tools/AuxFunctions/populateSelect.js';

function lineChart(studentsIDs, activity, average, datumBubble) {
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
    function updateFields(selectedCheckbox, selectedAnchor) {
        const student = {
            id: selectedCheckbox.value,
            name: selectedAnchor.textContent,
            isChecked: selectedCheckbox.checked
        };

        let newAv = average;

        generateGraph(student, activity, newAv, datumBubble);
    }

    function handleStudentChange(event) {
        const target = event.target;
    
        if (target.tagName === 'INPUT' && target.type === 'checkbox') {
            const selectedAnchor = target.nextElementSibling; // Obtém o âncora próximo à caixa de seleção
            const isChecked = target.checked; // Verifica se o checkbox está marcado
    
            // Verifica o estado atual do checkbox
            if (isChecked) {
                updateFields(target, selectedAnchor);
            } else {
                if(controller.verifyPeople(target.value)) {
                    console.log("DEU BOM")
                }else{
                    console.log("LASCOU")
                }

            }
        }
    }

    // Adiciona o ouvinte de evento ao seletor de estudantes
    selectorStudents.addEventListener('click', handleStudentChange);

    // Carrega os arquivos CSV e popula o seletor de estudantes
    Promise.all([
        d3.csv(quizListPath),
        d3.csv(userListPath)
    ]).then(data => {
        const [quizList, userList] = data;
        const listOfStudents = findStudentsInCSV(studentsIDs, userList);
        populateSelect(listOfStudents, "students", "userid", "name");

        // Adiciona novamente o ouvinte de evento após a população do seletor
        selectorStudents.addEventListener('click', handleStudentChange);
    });
}

export default lineChart;
