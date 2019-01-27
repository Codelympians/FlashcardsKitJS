function beginLoadJSON(filePath, shouldUseDefinitionAsFront) {
    loadJSON(filePath, didLoadJSON)
    shouldUseDefinitionAsFront = shouldUseDefinitionAsFront
}

function didLoadJSON(loadedJSON) {
    name = loadedJSON.name
    congratulateCard = loadedJSON.congratulateCard
    flashcards = loadedJSON.flashcards
}

// You can modify the following code or move them elsewhere
beginLoadJSON("demo-data.json", shouldUseDefinitionAsFront)
//termFontSizeMultiplier = 1/7
//definitionFontSizeMultiplier = 1/12
