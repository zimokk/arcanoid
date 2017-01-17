function Ball(speed, radius, left, top, corner, color) {
    this.speed = typeof speed === 'number' ? speed : 30;
    this.radius = radius || 20;
    this.left = left || 0;
    this.top = top || 0;
    this.corner = corner || 45;
    this.sin = this.getSin();
    this.cos = this.getCos();
    this.color = color || "black"
}

Ball.prototype.init = function (  ) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.left, this.top, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
};

Ball.prototype.getSin = function () {
    return math.sin(math.unit(this.corner, 'deg'));
};

Ball.prototype.getCos = function () {
    return math.cos(math.unit(this.corner, 'deg'));
};

Ball.prototype.getAsin = function (  ) {
    return math.asin(this.sin)*180/Math.PI;
};

Ball.prototype.getAcos = function (  ) {
    return math.acos(this.cos)*180/Math.PI;
};

Ball.prototype.update = function(dt) {
    this.left += this.speed*dt*this.cos;
    this.top -= this.speed*dt*this.sin;
};

Ball.prototype.render = function(  ) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.left, this.top, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
};

Ball.prototype.changeColor = function (  ) {
    this.color = getRandomColor();
};

Ball.prototype.correctCorner = function ( delta, max ) {
    let corner = this.getAsin();
    let correctedCorner = corner + delta * 90 * delta/max;
    if(corner < 90){
        this.corner = correctedCorner < 10 ? 10 : correctedCorner;
    } else{
        this.corner = correctedCorner > 170 ? 170 : correctedCorner;
    }
    this.sin = this.getSin();
    this.cos = this.getCos();
};

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
