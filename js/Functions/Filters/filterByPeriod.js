function filterByPeriod(rawData, period) {

    const timeStart = period.start
    const timeEnd = period.end

    if (rawData.t >= timeStart && rawData.t <= timeEnd) {
        return true;
    }
}
export default filterByPeriod