function filterByUser(rawData, user) {
    if (rawData.userid === user.id) {
        return true;
    }
}
export default filterByUser