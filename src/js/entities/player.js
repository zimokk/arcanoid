function Player(speed, width, height, aimTop, aimLeft, left, top) {
    this.speed = typeof speed === 'number' ? speed : 50;
    this.width = width || 200;
    this.height = height || 20;
    this.aimTop = aimTop;
    this.aimLeft = aimLeft;
    this.left = left || canvas.width/2-this.width/2;
    this.top = top || canvas.height-this.width/2;
    this.center = this.left + this.width;
}

Player.prototype.setLeft = function ( left ) {
    this.left = left;
    this.center = this.left+this.width/2;
};
Player.prototype.getLeft = function () {
    return this.left;
};

Player.prototype.init = function (  ) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.left , this.top, this.width, this.height);
};

Player.prototype.update = function(dt) {
    let leftDifference = this.aimLeft - this.center;
    let currentSpeed = this.speed;
    if(leftDifference > -this.width/3 && leftDifference < this.width/3){
        currentSpeed = Math.abs(leftDifference);
    }
    if(leftDifference > 0){
        this.setLeft(this.left + currentSpeed * dt);
    } else if(leftDifference < 0){
        this.setLeft(this.left - currentSpeed * dt);
    }
};

Player.prototype.render = function(  ) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.left , this.top, this.width, this.height);
};

Player.prototype.getCenterOffset = function ( point ) {
    return (this.left + this.width/2 - point);
};

Player.prototype.setAim = function ( coordsObject ) {
    this.aimLeft = coordsObject.x;
    this.aimTop = coordsObject.y;
};

function checkPlayerBounds() {
    if(player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }
    //
    // if(player.pos[1] < 0) {
    //     player.pos[1] = 0;
    // }
    // else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
    //     player.pos[1] = canvas.height - player.sprite.size[1];
    // }
}
