function Snake(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale*1;
    this.ySpeed = 0;
    this.totalScore = 0;
    this.tail = [];
    this.direction = "right";

    this.draw = function(){
        canvasCTX.fillStyle = '#FFFFFF';

        for(var i = 0; i < this.tail.length; i++){
            canvasCTX.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);    
        }
        canvasCTX.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function(){
        for(var i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.totalScore - 1] = {x: this.x, y: this.y};
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        if(this.x > canvasElement.width){
            this.x = 0;
        }
        if(this.x < 0){
            this.x = canvasElement.width;
        }
        if(this.y > canvasElement.height){
            this.y = 0;
        }
        if(this.y < 0){
            this.y = canvasElement.height;
        }
    }

    this.changeDirection = function(direction){
        switch(direction){
            case 'Up':
                if(this.direction != 'down'){
                    this.xSpeed = 0;
                    this.ySpeed = -scale;
                    this.direction = 'up';
                }
                break;
            case 'Down':
                if(this.direction != 'up'){
                    this.xSpeed = 0;
                    this.ySpeed = scale;
                    this.direction = 'down';
                }
                break;
            case 'Left':
                if(this.direction != 'right'){
                    this.xSpeed = -scale;
                    this.ySpeed = 0;
                    this.direction = 'left';
                }
                break;
            case 'Right':
                if(this.direction != 'left'){
                    this.xSpeed = scale;
                    this.ySpeed = 0;
                    this.direction = 'right';
                }
                break;
        }
    }

    this.eat = function(fruit){
        if(this.x === fruit.x && this.y === fruit.y){
            this.totalScore++;
            return true;
        }
        return false;
    }

    this.checkCollision = function() {
        for (var i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                // this.totalScore = 0;
                // this.tail = [];
                return true;
            }
        }
        return false;
    }
}