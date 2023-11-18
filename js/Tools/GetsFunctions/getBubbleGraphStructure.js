function getBubbleGraphStructure(currentDomain) {

    let graphDataStructure = []

    currentDomain.x.forEach(xi => {
        currentDomain.y.forEach(yi => {
            graphDataStructure.push({ event: yi, date: xi, totalCases: 0, totalSumOfGrades: 0, grades: [], ids: [], userInfo: []})
        })
    })

    return graphDataStructure

}
export default getBubbleGraphStructure