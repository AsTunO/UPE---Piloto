import getDomainsContent from "../GetsFunctions/getDomainsContent.js"
import getBubbleGraphStructure from "../GetsFunctions/getBubbleGraphStructure.js"
import getBubblesContent from "../GetsFunctions/getBubblesContent.js"
import filterLogsByActivity from "./filterLogsByActivity.js"
import sortEventsByTime from "../SortsFunctions/sortEventsByTime.js"

function filterData(DATASTORE, activity, firstAccess) {

    let dataToBePlotted = {
        domainContent : null,
        bubblesContent : null
    }   

    DATASTORE.logs = sortEventsByTime(filterLogsByActivity(DATASTORE.logs, DATASTORE.quizList[activity]))
    
    dataToBePlotted.domainContent = getDomainsContent(DATASTORE.quizList[activity])
    let bubbleStructureData = getBubbleGraphStructure(dataToBePlotted.domainContent)
    dataToBePlotted.bubblesContent = getBubblesContent(DATASTORE, bubbleStructureData, firstAccess)

    return dataToBePlotted

}

export default filterData