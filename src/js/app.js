var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let player = new Player(600,100,20,0,0);
let ball = new Ball(750,20,50,20,57,"blue");
player.init();
ball.init();
initEvents(canvas);

