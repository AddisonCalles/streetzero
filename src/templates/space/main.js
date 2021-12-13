import { Configs } from '../config.js';
import { Game } from './controllers/game.class.js';
import { Colors } from './ui/colors.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

let counterLoop = 0;
let lastMark = new Date().getTime();
let initMark;
const game = new Game(canvas);
game.nextLevel();
game.playEvent.subscribe(() => {
  initMark = new Date().getTime();
});
game.gameOverEvent.subscribe(()=>{
    //clearInterval(timer);
});

const mainRunner = () => {
  let fps = 20;
  let fpsCounter = 0;
  initMark = new Date().getTime();
  return setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render();
    if (!game.isPlay) {
      ctx.font = "20px Arial";
      ctx.fillStyle = 'gray';
      ctx.fillText('Press Click to Start...', (canvas.width / 2) - 100, canvas.height / 2);
    }
    



   
    


    const now = new Date().getTime();
    const milliSecondsDif = (now) - lastMark;
    const time = parseInt((now - initMark) / 1000);

    if (milliSecondsDif >= 1000) {
      lastMark = new Date().getTime();
      fps = fpsCounter;
      fpsCounter = 0;
    }
    
    ctx.font = "12px Arial";
    ctx.fillStyle = Colors.indicators;
    ctx.fillText(`Enemies: ${game.enemies.length} | Level: ${game.level} | points: ${game.points}`, 15, 45);
    ctx.fillText(`Shoots: ${game.player.rockets.length} `, 15, 30);
    ctx.fillText(`fps: ${fps} | time: ${game.gameOver || !game.isPlay? 0: time} seg`, 15, 15);
    fpsCounter++;
    //counterLoop++;
  }, 1000 / (Configs.gameSpeed))
}

let timer = mainRunner();
