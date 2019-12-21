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

var TopScoresTable_Body = document.getElementById("tableScoresData");

function fillTopScores(TopScoresTable_Body, totalScore, PlayerName){
    if(hasCookie(PlayerName)){
        var cookieValue = getCookie(PlayerName);
        if(cookieValue < totalScore){
            updateCookie(PlayerName, totalScore, 20);
        }
    }else{
        setCookie(PlayerName, totalScore, 20);
    }
    allCookiesData = allCookiesList();
    allCookiesData.sort(function(a,b){return parseInt(b.cookieValue) - parseInt(a.cookieValue)});
    if(allCookiesData.length > 5){
        var old_value = allCookiesData.pop();
        deleteCookie(old_value['cookieKey']);
    }

    TopScoresTable_Body.innerHTML = "";
    for(i = 0; i < allCookiesData.length; i++){
        TopScoresTable_Body.innerHTML += "<tr><td>"+ allCookiesData[i]['cookieKey'] +"</td><td>"+ allCookiesData[i]['cookieValue'] +"</td></tr>";
    }
}

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

        //snake.checkCollision() //7otha badl l true f if l ta7t
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

            //TODO: change to the values of player 
            fillTopScores(TopScoresTable_Body, 27, "mina");
        }
        document.querySelector('.score').innerText = snake.totalScore;

    }, timeIntervalCount);
}());

var eventClickFunction = function(){
    var direction = event.key.replace('Arrow', '');
    snake.changeDirection(direction);
}

window.addEventListener('keydown', eventClickFunction);


