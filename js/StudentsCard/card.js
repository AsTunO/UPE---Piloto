import createGraph from '../LineChart/graph.js';

let users = [];
let user = {};

function populateCbOptions(cbelement, options, selectedIndex = 0) {
    cbelement.options.length = 0;

    options.forEach((op, index) => {
        var newOption = document.createElement("option");
        newOption.id = op.id;
        newOption.text = op.text;

        if (index == selectedIndex) {
            newOption.setAttribute('selected', 'selected');
        }
        cbelement.add(newOption);
    });
}

d3.csv("./data/user_list_see.csv",
    function (data) {
        users.push({ id: data.userid, text: data.name });
    }).then(function () {
        populateCbOptions(document.getElementById("students"), users)
    });


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
