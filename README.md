# Street Zero
![GitHub stars](https://img.shields.io/github/stars/AddisonCalles/streetzero) ![Github forks](https://img.shields.io/github/forks/AddisonCalles/streetzero) ![GitHub license](https://img.shields.io/github/license/AddisonCalles/streetzero) ![Github issues](https://img.shields.io/github/issues/AddisonCalles/streetzero)


This package is in construction.

This is a Micro Framework to make Game 2D using canvas HTML.

You can see how use this framework in this github repository: 

#### Example 1: https://github.com/AddisonCalles/shoot-space.git
#### Example 2: https://github.com/AddisonCalles/flappy_space


## How to start
---
### file html:

```html
    <canvas id="canvas" width="1000" height="1000">
    <script src="main.js" type="module"></script>
```

### script: main.js
```javascript
import { Game } from "./node_modules/streetzero/dist/streetzero.esm.js";

export class MyGame extends Game {
    constructor(canvas){
        super(canvas)
    }
    onRender(){
        // Render and update in this method.
    }
    onPreload() {
        // Prepare the configuration of your elements of your game
    }
     //... Other events
}


const canvas = document.getElementById("canvas");

const game = new MyGame(canvas);
game.start();
```

## Game Class
---
Extends this class to be able to create a recurring routine and manage the basic elements of the video game.
## Attributes
---
Overwrite any of these methods within your MyGame class

| Attribute  | Description |
| :------------ |:---------------:|
| start() | Start the life cycle of the game. This method starts the frame rate loop that allows the game graphics to be rendered. |
| stop() | Stopt the life cycle of the game. |
| play() | Set the ``isPlay`` property to true |
| pause() | Set the ``isPlay`` property to false |
| clearCanvas() | Remove all elements rendered at the current frame within the canvas  |
| nextLevel(sleepOffset) | Pending documentation  |
| incrementPoints(increase?:number) | Allows to increase an amount by means of the ``increase`` parameter, if the ``increase`` parameter is not set, it will increase the value of the ``points`` property by 1 |
| gameover | Boolean property, allows to obtain or set the value of the gameover state. Setting this property to `true` or ``false`` will not start or stop the game loop. |
| isPlay | Boolean property, it allows to obtain the value of the true play property, this property is immediately after the play method is called, and it is false when the play method has not been called or immediately after the pause method is called. |
| speed | Property of type number, allows obtain or setting the value of the speed at which the cycle of ticks per second is executed, <br>**Example**. If we set the speed to 60, that's roughly 60 frames per second. If you want to accurately get the actual number of frames per second use the ``fps`` property. <br>**Warning:** The value of the speed property must be set before calling the ``start()`` method. |
| points | Property of type number, It allows to obtain the accumulated points of the game. You can edit this property using the method ``incrementPoints`` |
| level | Property of type number, It allows to obtain the value of the current game level. This value is edited via the ``nextLevel`` method. |
| initTime | Property of type number, allows to obtain the timestamp, in millisecods format, registered when calling the ``start()`` method. |
| fps | Property of type number, it allows to obtain the rate of average frames per second (fps). This value is updated over the course of the game execution. |
| context | allows obtain the CanvasRenderingContext2D. |
| canvas | allow obtain the canvas object |
## Events
---
Overwrite any of these methods within your MyGame class

| Event  | Description |
| :------------ |:---------------:|
| onStart() | Este metodo se ejecuta cuando la funcion `start` de la clase padre es llamada. |
| onStop() | Este metodo se ejecuta cuando la funcion `stop` de la clase padre es llamada. |
| onGameOver() | Este metodo se ejecuta cuando la funcion `gameOver` de la clase padre es llamada. |
| onFire(event) | Este metodo es llamado cuando se detecta el evento `click` del mouse |
| onMouseMove(event) | Pending documentation |
| onPreload() | Pending documentation |
| onRender() | Pending documentation |
| onTouchStart(event) | Pending documentation |
| onTouchCancel(event) | Pending documentation |
| onTouchEnd(event:any) | Pending documentation |
| onNextLevel() | Pending documentation |
| onNexLevelPress() | Pending documentation |
| onKeyDown(event) | Pending documentation |
| onKeyUp(event: any) | Pending documentation |
## Drawable Objects
---

#### Pending documentation

## Kinematiks
---
Example Rocket:
```javascript
import { Kinematic, LayerPath } from './node_modules/streetzero/dist/streetzero.esm.js';
export class Rocket extends Kinematic {
    #primaryColor;
    constructor(canvas, color, x, y) {
        Sounds.shoot()
        super(canvas, x , y, 30, 10);
        this.#primaryColor = color;
        this.initLayer();
    }
    initLayer() {
        const shoot = new Path2D();
        const center = 5;
        shoot.moveTo(0, center-2);
        shoot.lineTo(20, center-2);
        shoot.lineTo(25, center);
        shoot.lineTo(20, center+2);
        shoot.lineTo(0, center+2);
        shoot.lineTo(0, center-2);
        shoot.closePath();
        
        const flame = new Path2D();
        flame.ellipse(0, center, 10,  4, 0, 0,Math.PI*2); // llama
        
        const flame2 = new Path2D();
        flame2.ellipse(2, center, 8,  2, 0, 0,Math.PI*2); // llama

        super.setLeyers([ 
            new LayerPath(shoot, this.#primaryColor, this), 
            new LayerPath(flame, 'red', this), 
            new LayerPath(flame2, 'yellow', this)]);
    }
}  
```

### script: main.js
```javascript
import { Game } from "./node_modules/streetzero/dist/streetzero.esm.js";
import { Rocket } from './Rocket.js';

export class MyGame extends Game {
    rocket;
    constructor(canvas){
        super(canvas)
    }
    onRender(){
        this.rocket.move();
        this.rocket.render();
        // Render and update in this method.
    }
    onPreload() {
        this.rocket = new Rocket(super.canvas, 'gray', 0, super.canvas.width / 2);
        this.rocket.vector.setVector(4, 180);
    }
     //... Other events
}


const canvas = document.getElementById("canvas");

const game = new MyGame(canvas);
game.start();
game.play();
```
