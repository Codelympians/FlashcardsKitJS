/* Customizable Variables */

let termFontSizeMultiplier = 1/6
let definitionFontSizeMultiplier = 1/12
let flashcards = []
let congratulateCard = {
    term: "おめでとう!!",
    definition: "Congratulations!\n(You've completed one entire set.)",
}
let shouldUseDefinitionAsFront = false

/* Core Code */

const instructionsFontSizeMultiplier = 1/18
const border = 100

let fpsEngine = {
    oldTime: 0, // Time at which the previous frame is updated
    fpsCooldown: 0, // When fpsCooldown <= 0, set displayFPS = fps
    displayFPS: 0, // fps displayed on screen, updated every second
    realFPS: 0,
    
    // Functions related to FPS
    // Usage: insert them at the end of the draw() function
    updateFPS: function() {
        let currentTime = millis()
        let fpsDelta = currentTime - this.oldTime

        // Update realFPS
        this.realFPS = frameRate() // function provided by p5.js API
        
        // Update displayFPS
        this.fpsCooldown -= fpsDelta
        if (this.fpsCooldown <= 0) {
            this.displayFPS = this.realFPS
            this.fpsCooldown = 1000
        }

        this.oldTime = currentTime
    },
    showFPS: function(r, g, b) {
        fill(r, g, b)
        textAlign(RIGHT, TOP) // Text alignment of the fps label
        textSize(24)
        text(`${Math.floor(this.displayFPS)} fps`, width - 16, 16) // Position of the fps label
    }
}

let cardWidth = null
let cardHeight = null

function recalibrate() {
    const xUsable = windowWidth - border;
    const yUsable = windowHeight - border;

    //if wider use height as boundary
    if (xUsable > yUsable * 4 / 3) {
        cardWidth = yUsable * 4 / 3;
        cardHeight = yUsable;
    } else if (yUsable > xUsable * 3 / 4) {
        cardWidth = xUsable;
        cardHeight = xUsable * 3 / 4;
    }
}

let currentCard = null
let isShowingAnswer = false
let deck = []
let completedIndices = []

function cardSelect() {
    if (completedIndices.length === deck.length) {
        showCongratulateCard()
    } else {
        var cardAlreadyViewed = true
        do {
            var cardNotViewed = true
            var chosenCard = Math.floor(Math.random() * deck.length)
            currentCard = deck[chosenCard]
            for (var cardIndex of completedIndices) {
                if (cardIndex === chosenCard) {
                    cardNotViewed = false
                    break
                }
            }
            if (cardNotViewed) {
                cardAlreadyViewed = false
                completedIndices.push(chosenCard)
            }
        } while (cardAlreadyViewed)
    }
}
  
function showCongratulateCard() {
    currentCard = congratulateCard
    completedIndices = []
}
  
function displayFlashcard() {
    const frontFontSize = !shouldUseDefinitionAsFront ? (cardHeight * termFontSizeMultiplier) : (cardHeight * definitionFontSizeMultiplier)
    const backFontSize = !shouldUseDefinitionAsFront ? (cardHeight * definitionFontSizeMultiplier) : (cardHeight * termFontSizeMultiplier)
    const instructionsFontSize = cardHeight * instructionsFontSizeMultiplier
    
    textAlign(CENTER, CENTER)
    const xCenter = windowWidth / 2
    const yCenter = windowHeight / 2
    
    const frontCenterY = yCenter - cardHeight / 4
    const backCenterY = yCenter
    const instructionsCenterY = yCenter + cardHeight / 4
    
    // Draw background
    rectMode(CENTER)
    fill(200)
    rect(xCenter, yCenter, cardWidth, cardHeight)

    // Front
    textSize(frontFontSize)
    fill(20)
    text(!shouldUseDefinitionAsFront ? currentCard.term : currentCard.definition, xCenter, frontCenterY);
  
    // Back
    if (isShowingAnswer) {
        textSize(backFontSize)
        fill(100, 20, 20)
        text(!shouldUseDefinitionAsFront ? currentCard.definition : currentCard.term, xCenter, backCenterY)
    }
  
    // Instructions
    let instructions = "click to show answers"
    if (isShowingAnswer) {
        instructions = "click to switch card"
    }
    fill(100)
    textSize(instructionsFontSize)
    text(instructions, xCenter, instructionsCenterY)
}

function displayProgress() {
    // Progress bar - base rectangle
    fill(50)
    rect(16 + 100, 16 + 12, 200, 24)
  
    // Progress bar - progress
    fill(0, 160, 160)
    rect(16 + 100 * (completedIndices.length / deck.length), 16 + 12, 200 * (completedIndices.length / deck.length), 24)
  
    // Fraction text
    textAlign(LEFT, TOP)
    textSize(24)
    text(`${completedIndices.length}/${deck.length}`, 236, 16)
}
  
function displayCredits() {
    // Fraction text
    fill(80, 80, 130)
    textAlign(RIGHT, BOTTOM)
    textSize(16)
    text("Powered by github.com/Codelympians/FlashcardsKitJS", windowWidth - 12, windowHeight - 12)
}
    
function mousePressed() {
    if (isShowingAnswer) {
        cardSelect()
    }
    isShowingAnswer = !isShowingAnswer
}

function setup() {
    // setup() runs once. Put your setup code here.
    cardSelect()
    recalibrate()
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    // draw() runs every time before a new frame is rendered. 

    background(20)
    displayFlashcard()
    displayProgress()
    displayCredits()
  
    // Update and show FPS
    fpsEngine.updateFPS()
    fpsEngine.showFPS(100, 100, 100)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    recalibrate()
}
