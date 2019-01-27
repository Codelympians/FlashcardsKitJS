'use strict'

let canLoadJSON = false
let didAttemptToLoadJSON = false

function tryLoadingJSON(filePath, shouldUseDefinitionAsFront) {
    if (canLoadJSON && !didAttemptToLoadJSON) {
        loadJSON(filePath, didLoadJSON)
        shouldUseDefinitionAsFront = shouldUseDefinitionAsFront
        didAttemptToLoadJSON = true
    }
}

function didLoadJSON(loadedJSON) {
    name = loadedJSON.name
    congratulateCard = loadedJSON.congratulateCard
    flashcards = loadedJSON.flashcards
}

// You can modify the following code or move them elsewhere
function userDefinedLoading() {
    //termFontSizeMultiplier = 1/7
    //definitionFontSizeMultiplier = 1/12
    tryLoadingJSON("demo-data.json", false)
}

