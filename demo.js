'use strict'

let didAttemptToLoadJSON = false

function tryLoadingJSON(filePath, shouldUseDefinitionAsFront) {
    if (!didAttemptToLoadJSON) {
        loadJSON(filePath, didLoadJSON)
        shouldUseDefinitionAsFront = shouldUseDefinitionAsFront
        didAttemptToLoadJSON = true
        console.log("Loading Process: willLoad")
    }
}

function didLoadJSON(loadedJSON) {
    name = loadedJSON.name
    congratulateCard = loadedJSON.congratulateCard
    flashcards = loadedJSON.flashcards
    deck = flashcards.slice()
    console.log("Loading Process: didLoad")
}

// You can modify the following code or move them elsewhere
function userDefinedLoading() {
    termFontSizeMultiplier = 1/8
    definitionFontSizeMultiplier = 1/14
    tryLoadingJSON("demo-data.json", false)
    console.log("Loading Process: didAttemptToLoad")
}

