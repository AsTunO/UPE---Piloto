function filterByUser(rawData, user) {
    if (rawData.userid === user) {
        return true;
    }
}
export default filterByUser