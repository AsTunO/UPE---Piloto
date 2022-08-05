//const svgCard = d3.select("#students-list")
    
var students = [];

d3.csv("./data/user_list_see.csv",
    function (data) {
        students.push(data);
    }).then(function () {
        students.forEach(function (d) {
            console.log(d);
        })
    })
