var lastTime = Date.now();
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimationFrame(main);
    // requestAnimFrame(main);
}

function update(dt) {
    handleInput(dt);
    player.update(dt);
    ball.update(dt);

    checkCollisions();
}

function updateEntities(dt) {
    // Update the player sprite animation
    player.sprite.update(dt);

    // // Update all the bullets
    // for(var i=0; i<bullets.length; i++) {
    //     var bullet = bullets[i];
    //
    //     switch(bullet.dir) {
    //         case 'up': bullet.pos[1] -= bulletSpeed * dt; break;
    //         case 'down': bullet.pos[1] += bulletSpeed * dt; break;
    //         default:
    //             bullet.pos[0] += bulletSpeed * dt;
    //     }
    //
    //     // Remove the bullet if it goes offscreen
    //     if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
    //         bullet.pos[0] > canvas.width) {
    //         bullets.splice(i, 1);
    //         i--;
    //     }
    // }
    //
    // // Update all the enemies
    // for(var i=0; i<enemies.length; i++) {
    //     enemies[i].pos[0] -= enemySpeed * dt;
    //     enemies[i].sprite.update(dt);
    //
    //     // Remove if offscreen
    //     if(enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
    //         enemies.splice(i, 1);
    //         i--;
    //     }
    // }
    //
    // // Update all the explosions
    // for(var i=0; i<explosions.length; i++) {
    //     explosions[i].sprite.update(dt);
    //
    //     // Remove if animation is done
    //     if(explosions[i].sprite.done) {
    //         explosions.splice(i, 1);
    //         i--;
    //     }
    // }
}

function checkCollisions() {
    checkPlayerBounds();
    checkBallBounds();

    // Run collision detection for all enemies and bullets
    // for(var i=0; i<enemies.length; i++) {
    //     var pos = enemies[i].pos;
    //     var size = enemies[i].sprite.size;
    //
    //     for(var j=0; j<bullets.length; j++) {
    //         var pos2 = bullets[j].pos;
    //         var size2 = bullets[j].sprite.size;
    //
    //         if(boxCollides(pos, size, pos2, size2)) {
    //             // Remove the enemy
    //             enemies.splice(i, 1);
    //             i--;
    //
    //             // Add score
    //             score += 100;
    //
    //             // Add an explosion
    //             explosions.push({
    //                 pos: pos,
    //                 sprite: new Sprite('img/sprites.png',
    //                     [0, 117],
    //                     [39, 39],
    //                     16,
    //                     [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    //                     null,
    //                     true)
    //             });
    //
    //             // Remove the bullet and stop this iteration
    //             bullets.splice(j, 1);
    //             break;
    //         }
    //     }
    //
    //     if(boxCollides(pos, size, player.pos, player.sprite.size)) {
    //         gameOver();
    //     }
    // }
}

function checkPlayerBounds() {
    // Check bounds
    if(player.getLeft() < 0) {
        player.setLeft(0);
    }
    else if(player.getLeft() > canvas.width - player.width) {
        player.setLeft(canvas.width - player.width);
    }
}

function checkBallBounds (  ) {
    if(ball.left < ball.radius || ball.left > canvas.width - ball.radius) {
        ball.cos = -ball.cos;
    }
    if(ball.top < ball.radius) {
        ball.sin = -ball.sin;
    } else if(ball.top > canvas.height - player.height - ball.radius){
        if(ball.left > player.getLeft() && ball.left < player.getLeft() + player.width){
            ball.sin = -ball.sin;
            let delta = player.getCenterOffset(ball.left);
            ball.correctCorner(delta, player.width/2);
        } else{
            ball.changeColor();
            ball.sin = -ball.sin;
        }
    }
}

function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.render();
    ball.render();
}

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

// Reset game to original state
function reset() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-over-overlay').style.display = 'none';
    isGameOver = false;
    gameTime = 0;
    score = 0;

    enemies = [];
    bullets = [];

    player.pos = [50, canvas.height / 2];
}

function handleInput(dt) {
    if(input.isDown('LEFT') || input.isDown('a')) {
        player.setLeft(player.getLeft() - player.speed * dt);
    }
    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.setLeft(player.getLeft() + player.speed * dt);
    }
}

main();
