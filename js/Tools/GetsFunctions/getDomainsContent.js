import getPeriod from "./getPeriod.js"
function getDomainsContent(activityData) {
    let domainsContent = {
        x: getPeriod(Number(activityData.t_open), Number(activityData.t_close)),
        y: [
            "course_vis",
            "resource_vis",
            "forum_vis",
            "forum_participation",
            "assignment_vis",
            "assignment_try",
            "assignment_sub"
        ]
    }
    return domainsContent
}
export default getDomainsContent