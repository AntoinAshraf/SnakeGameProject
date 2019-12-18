var canvasElement = document.querySelector(".snakeGameCanvas");
var canvasCTX = canvasElement.getContext("2d");
var scale = 10;

var rows = canvasElement.height / scale;
var cols = canvasElement.width / scale;

var snake;
var timeIntervalCount = 250;
var allCookiesData;
var ulTopScores = document.getElementById("ulTopScores");

var topScoresDiv = document.getElementById("topScoresDisplay");

(function setup(){
    snake = new Snake();
    var fruit = new Fruit();
    fruit.pickLocation();

    var timeIntervalChangeSnake = window.setInterval( function(){
        canvasCTX.clearRect(0, 0, canvasElement.width, canvasElement.height);
        fruit.draw();
        snake.update();
        snake.draw();
        if(snake.eat(fruit)){
            fruit.pickLocation();
        }

        if(true){
            clearInterval(timeIntervalChangeSnake);
            window.removeEventListener('keydown', eventClickFunction);
            canvasCTX.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCTX.font = "18pt Helvetica";
            canvasCTX.shadowOffsetX = 3;
            canvasCTX.shadowOffsetY = 3;     
            canvasCTX.shadowColor = "rgba(10,10,10,0.3)";
            canvasCTX.shadowBlur = 4;
            canvasCTX.fillText("Game Over", 120, 170);
            topScoresDiv.style.display = "block";
            fillTopScores();
        }
        document.querySelector('.score').innerText = snake.totalScore;

    }, timeIntervalCount);
}());

var eventClickFunction = function(){
    var direction = event.key.replace('Arrow', '');
    snake.changeDirection(direction);
}

window.addEventListener('keydown', eventClickFunction);

function fillTopScores(){
    allCookiesData = allCookiesList();
    allCookiesData.sort(function(a,b){return parseInt(a.cookieValue) - parseInt(b.cookieValue)});
    var htmlTagElement = "";
    
    for(i = 0; i < allCookiesData.length; i++){
        if(allCookiesData[i][1] > snake.totalScore){
            
        }
    }
}
