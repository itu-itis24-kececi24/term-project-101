const hiddenWord = "chest"

let currentLives = 3
let currentPoints = 0

let gameState = 0 // 0: running, 1: finished

function checkLetter(letter){
    if(letter.length > 1 && letter === "chest"){
        Array.from(document.querySelector("body > div.letters").children).forEach((item, index, array) => {
            item.src = "images/".concat(item.id.split("-")[1]).concat(".svg")
        })

        return 2
    }
    if(letter.length > 1 && letter !== "chest"){
        //immediate loss
        return 3
    }

    let letterArray = hiddenWord.split("")
    if(letterArray.includes(letter)){
        let imgId = "img-".concat(letter)
        document.getElementById(imgId).src = "images/".concat(letter).concat(".svg")

        return 1
    }
    return 0
}


function submitFunction(){
    if(gameState != 0){ return }

    let inputValue = document.getElementById("guess").value
    if(inputValue == ""){ return }

    document.getElementById("btn-reset").style.display = "inline-block"

    switch(checkLetter(inputValue)){
        case 0:
            currentLives -= 1
            console.log("Wrong guess")
            document.getElementById("feedback").innerHTML = "<span style='color: red;'>Wrong Guess!</span>"
            break
        case 1:
            currentPoints += 20
            console.log("Correct guess")
            document.getElementById("feedback").innerHTML = "<span style='color: green;'>Correct Guess!</span>"
            break
        case 2:
            currentPoints = 100
            console.log("Correct guess, guessed full word")
            document.getElementById("feedback").innerHTML = "<span style='color: green;'>Correct Word!</span>"
            break
        case 3:
            currentLives = 0
            console.log("Wrong word prediction")
            document.getElementById("feedback").innerHTML = "<span style='color: red;'>Wrong Word!</span>"
            break
    }

    document.getElementById("points").innerHTML = currentPoints
    updateLives()

    setTimeout(updateGameState, 10)
}

function updateLives(){
    text = ""
    for(i=0; i<currentLives; i++){
        text = text.concat("❤️")
    }

    document.getElementById("lives").innerHTML = text
}

function updateGameState(){
    if(currentLives == 0){
        alert("You have lost the game!")
        gameState = 1
    }
    if(currentLives < 2){
        document.getElementById("lives").style = "color: red; font-weight: bold;"
    }

    if(currentPoints == 100){
        alert("You have won the game!")
        gameState = 1
    }
}

function resetFunction(){
    Array.from(document.querySelector("body > div.letters").children).forEach((item, index, array) => {
        item.src = "images/blank.png"
    })

    currentLives = 3
    gameState = 0
    currentPoints = 0

    document.getElementById("points").innerHTML = currentPoints
    updateLives()

    document.getElementById("feedback").innerHTML = ""
    document.getElementById("guess").value = ""
}