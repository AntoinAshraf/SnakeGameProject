function Fruit(){
    this.x;
    this.y;

    this.pickLocation = function(){
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * cols - 1) + 1) * scale;
    }

    this.draw = function(){
        canvasCTX.fillStyle = "#01bb48";
        canvasCTX.fillRect(this.x, this.y, scale, scale);
    }
}