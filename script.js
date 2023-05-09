const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Calling changeDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Pushing food position to snake body array
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // Checking if the snake head hit the body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
// Now the Haed will move after every 125 mili-second, 125 is the speed of snake 
setIntervalId = setInterval(initGame, 180);
document.addEventListener("keyup", changeDirection);


// // Let's create Snake Food
// // Let's move Snake continously while pressing the Key
// const playBoard = document.querySelector(".play-board");

// let foodX, foodY;
// let snakeX=5, snakeY=10;
// let snakeBody = [];
// let velocityX = 0,  velocityY = 0;

// const changeDirection = (e) => {
//     // Changing va=elocity on tyhe based of key-press
//     if(e.key === "ArrowUp"){
//         velocityX = -1;
//         velocityY = 0;
//     } else if(e.key === "ArrowDown"){
//         velocityX = 1;
//         velocityY = 0;
//     } else if(e.key === "ArrowLeft"){
//         velocityX = 0;
//         velocityY = -1;
//     } else if(e.key === "ArrowRight"){
//         velocityX = 0;
//         velocityY = 1;
//     }
// }

// // Let change the food position 
// const changeFoodPosition = () => {
//     //Passing a random 0-30 value as food position
//     foodX = Math.floor(Math.random() * 30) + 1;
//     foodY = Math.floor(Math.random() * 30) + 1;
// }


// const initGame = () => {
//     // Let's create a Snake Food
//     let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

//     //checking if the snake hit the food
//     if(snakeX===foodX && snakeY===foodY){
//         changeFoodPosition();
//         snakeBody.push([foodX, foodY]);// Pushing the food position into snake array
//         console.log(snakeBody);

//     }

//     for (let i = snakeBody.length-1; i > 0; i--){
//         //shifting the forward values of the elemnet in the snake body
//         snakeBody[i] = snakeBody[i-1];
//     }
//     snakeBody[0] = [snakeX, snakeY]; // Settting the first element of snake body to current snake position



//     //updating the snake head's position on the basis of current velocity
//     snakeX += velocityX;
//     snakeY += velocityY;

//     // let's create snake body while adding the food
//     for(let i =0; i<snakeBody.length; i++){
//      // Let's create a Snake Head
//      // Addign a div for each part of the body
//         htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
//     }

   
//     playBoard.innerHTML = htmlMarkup;
// }
// changeFoodPosition();

// 
// setInterval(initGame, 125);

// // Let's move the Snake Headon the basis of heyword Arror click
// document.addEventListener("keydown", changeDirection);

// // Let's change the Food Position after Snake's Eat
