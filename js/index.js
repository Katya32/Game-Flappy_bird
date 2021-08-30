const canvas = document.querySelector("#canvas");
const header = document.querySelector(".header");
const context = canvas.getContext("2d");

const bird = new Image();
const background = new Image();
const foreground = new Image(); 
const pipeUp = new Image(); 
const pipeBottom = new Image(); 

bird.src = "img/bird.png";
background.src = "img/bg.png";
foreground.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png"; 
pipeBottom.src = "img/pipeBottom.png";

const fly = new Audio(); 
const score_audio = new Audio(); 

fly.src = "audio/fly.mp3"; 
score_audio.src = "audio/score.mp3";

const gap = 90;
const gravity = 1.5;
let positionX = 10;
let positionY = 150;
let score = 0;

const pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0,
}

function draw() {
    context.drawImage(background, 0, 0);
    for(let i=0; i<pipe.length; i+=1) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x -=1;
        if(pipe[i].x == 125) {
        pipe.push({
        x : canvas.width,
        y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
        }
         // Отслеживание прикосновений
         if(positionX + bird.width >= pipe[i].x
         && positionX <= pipe[i].x + pipeUp.width
         && (positionY <= pipe[i].y + pipeUp.height
         || positionY + bird.height >= pipe[i].y + pipeUp.height + gap) || positionY + bird.height >= canvas.height - foreground.height) {
         location.reload(); // Перезагрузка страницы
         }
         
          if(pipe[i].x == 5) {
          score++;
          score_audio.play();
          }

          if(score === 5) {
            header.textContent ="You win!!!"
            }
         
        }
        context.drawImage(foreground, 0, canvas.height-foreground.height);
        context.drawImage(bird, positionX, positionY);
        
        positionY += gravity
        
        context.fillStyle = "#000";
        context.font = "24px Verdana";
        context.fillText("Счет: " + score, 10, canvas.height - 20);
     
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;

const moveUp = () => {
positionY -=25;
fly.play()
}

document.addEventListener("keydown", moveUp);

