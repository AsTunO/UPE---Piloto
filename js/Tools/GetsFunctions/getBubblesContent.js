import filterByFirstAccess from "../FiltersFunctions/filterByFirstAccess.js"
import filterWithoutFirstAccess from "../FiltersFunctions/filterWithoutFirstAccess.js"

function getBubblesContent(DATASTORE, bubbleStructureData, firstAccess) {

    let bubbleData = ( firstAccess === true
        ? filterByFirstAccess(DATASTORE, bubbleStructureData)
        : filterWithoutFirstAccess(DATASTORE, bubbleStructureData)
    )

    return bubbleData
}

export default getBubblesContent