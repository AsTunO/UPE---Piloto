let bufferPeople = []
let count = 0;

function add(id) {
    bufferPeople.push(id)
    console.log(bufferPeople)
    count++
}

function remove(id) {
    bufferPeople.pop(id)
    console.log(bufferPeople)
    count--
}

function verifyPeople(studentID) {
    if(bufferPeople.includes(studentID)) {
        const graphToRemove = d3.select(`#graph-${studentID}`); // Seleciona o gráfico com o ID correspondente
        remove(studentID)
        console.log(bufferPeople)
        graphToRemove.remove();
        count = count - 1; // Resetar a contagem
        return true
    }
    return false
}

function showCount() {
    return count
}

function setCountFull() {
    count = 3
}

function consult(id) {
    if(bufferPeople.includes(id)) {
        return true
    }else{
        return false
    }
}

const controller = {
    add: add,
    remove: remove,
    verifyPeople: verifyPeople,
    showCount: showCount,
    setCountFull: setCountFull,
    consult: consult
}

export default controller