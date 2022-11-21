import createGraph from '../LineChart/graph.js';
import populateCbOptions from '../Tools/AuxFunctions/populateCbOptions.js'

let users = [];

d3.csv("./data/user_list_see.csv",
    function (data) {
        users.push({ id: data.userid, text: data.name });
    }).then(function () {
        populateCbOptions(document.getElementById("students"), users)
    });

let user = { id: "239", text: "Isabelle Santos" }; // Default Student
createGraph(user);

const tag = document.getElementById('student-name');
const selector = document.getElementById('students');
selector.addEventListener('change', function () {

    tag.textContent = selector.options[selector.selectedIndex].text;

    user = {
        id: selector.options[selector.selectedIndex].id,
        text: selector.options[selector.selectedIndex].text
    };
    createGraph(user);
});
