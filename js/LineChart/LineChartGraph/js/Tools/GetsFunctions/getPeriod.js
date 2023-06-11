import epochToDate from "../DateFunctions/epochToDate.js"
function getPeriod(timeStart, timeEnd) {
    
    let period = []
    const oneDay = 84000 // One day(epoch)

    for (let index = timeStart += oneDay; index < timeEnd; index += oneDay) {
        period.push((d3.timeFormat("%A, %d")(epochToDate(index))))
    }
    return period
}
export default getPeriod