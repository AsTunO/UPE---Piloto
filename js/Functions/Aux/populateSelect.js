import populateCbOptions from "./populateCbOptions.js";

function populateSelect(path) {

    let users = [];

    d3.csv(path,
        function (data) {
            users.push({ id: data.userid, text: data.name });
        }).then(function () {
            populateCbOptions(document.getElementById("students"), users)
        });

}

export default populateSelect