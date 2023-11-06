import getPeriod from "./getPeriod.js"
function getDomainsContent(activityData) {
    let domainsContent = {
        x: getPeriod(Number(activityData.t_open), Number(activityData.t_close)),
        y: [
            { text: "course_vis"},
            { text: "resource_vis"},
            { text: "forum_vis"},
            { text: "forum_participation"},
            { text: "assignment_vis"},
            { text: "assignment_try"},
            { text: "assignment_sub"}
        ]
    }
    return domainsContent
}
export default getDomainsContent