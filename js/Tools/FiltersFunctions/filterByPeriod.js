function filterByPeriod(rawData) {

    const timeStart = 1573596966
    const timeEnd = 1574207999

    if (rawData.t >= timeStart && rawData.t <= timeEnd) {
        return true;
    }
}
export default filterByPeriod