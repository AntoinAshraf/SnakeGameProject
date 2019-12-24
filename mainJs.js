var canvasElement = document.querySelector(".snakeGameCanvas");
var canvasCTX = canvasElement.getContext("2d");
var scale = 10;

var rows = canvasElement.height / scale;
var cols = canvasElement.width / scale;
var levelIncreaseFlag = true;
var snake;
var level = 1;
var timeIntervalCount = 200;
var prevScore = 0;
var timeIntervalChangeSnake = 0;
var allCookiesData;
var ulTopScores = document.getElementById("ulTopScores");

var topScoresDiv = document.getElementById("topScoresDisplay");

var TopScoresTable_Body = document.getElementById("tableScoresData");
var LoginBtn = document.getElementById('Submitbtn');
var GameScreenDiv = document.getElementById('gameScreen');
var loginContainerDiv = document.getElementById('LoginContainer');
var userNameLabel = document.getElementById('name');
var userNameParag = document.querySelector('.PlayerNameParag');

userNameLabel.addEventListener('keydown', function (e) {
    
    if (e.keyCode >= 96 && e.keyCode <= 105) {
        e.preventDefault();
    }
    if(e.keyCode >= 48 && e.keyCode <= 57){
        e.preventDefault();
    }
});

snake = new Snake();
var fruit = new Fruit();
fruit.pickLocation();

function updateSnake() {
    canvasCTX.clearRect(0, 0, canvasElement.width, canvasElement.height);
    fruit.draw();
    snake.update();
    snake.draw();
    if (snake.eat(fruit)) {
        fruit.pickLocation();
    }

    if (prevScore != snake.totalScore && snake.totalScore % 5 == 0 && levelIncreaseFlag == true) {
        levelIncreaseFlag = false;
    }

    prevScore = snake.totalScore;

    if (snake.totalScore % 5 == 0 && levelIncreaseFlag == false) {
        level++;
        console.log(level);
        if (timeIntervalCount - 40 > 0) {
            clearInterval(timeIntervalChangeSnake);
            timeIntervalCount -= 40;
            timeIntervalChangeSnake = window.setInterval(updateSnake, timeIntervalCount)
            console.log(timeIntervalCount);
        }
        levelIncreaseFlag = true;
    }
    //snake.checkCollision() //7otha badl l true f if l ta7t
    if (snake.checkCollision()) {
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
        fillTopScores(TopScoresTable_Body, snake.totalScore, userNameParag.innerText);
    }
    document.querySelector('.score').innerText = snake.totalScore;
    document.querySelector('.levelParag').innerText = level;
}

LoginBtn.addEventListener('click', function () {
    if(userNameLabel.value != ""){
        userNameParag.innerText = userNameLabel.value;
        GameScreenDiv.style.display = 'block';
        loginContainerDiv.style.display = 'none';
        timeIntervalChangeSnake = window.setInterval(updateSnake, timeIntervalCount);
    }else{
        alert("Your name is required");
    }
});

function fillTopScores(TopScoresTable_Body, totalScore, PlayerName) {
    if (hasCookie(PlayerName)) {
        var cookieValue = getCookie(PlayerName);
        if (cookieValue < totalScore) {
            updateCookie(PlayerName, totalScore, 20);
        }
    } else {
        setCookie(PlayerName, totalScore, 20);
    }
    allCookiesData = allCookiesList();
    allCookiesData.sort(function (a, b) { return parseInt(b.cookieValue) - parseInt(a.cookieValue) });
    if (allCookiesData.length > 5) {
        var old_value = allCookiesData.pop();
        deleteCookie(old_value['cookieKey']);
    }

    TopScoresTable_Body.innerHTML = "";
    for (i = 0; i < allCookiesData.length; i++) {
        TopScoresTable_Body.innerHTML += "<tr><td>" + allCookiesData[i]['cookieKey'] + "</td><td>" + allCookiesData[i]['cookieValue'] + "</td></tr>";
    }
}


var eventClickFunction = function () {
    var direction = event.key.replace('Arrow', '');
    snake.changeDirection(direction);
}

window.addEventListener('keydown', eventClickFunction);





