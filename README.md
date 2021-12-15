# Street Zero
![GitHub stars](https://img.shields.io/github/stars/AddisonCalles/streetzero) ![Github forks](https://img.shields.io/github/forks/AddisonCalles/streetzero) ![GitHub license](https://img.shields.io/github/license/AddisonCalles/streetzero) ![Github issues](https://img.shields.io/github/issues/AddisonCalles/streetzero)


This package is in construction.

This is a Micro Framework to make Game 2D using canvas HTML.

You can see how use this framework in this github repository: 

#### Example 1: https://github.com/AddisonCalles/shoot-space.git
#### Example 2: https://github.com/AddisonCalles/flappy_space
## How to start
---
### Game Class

Extends this class to be able to create a recurring routine and manage the basic elements of the video game.

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


## Events
---
Overwrite any of these methods within your MyGame class

| Event  | Description |
| :------------ |:---------------:|
| onStart() | Pending documentation |
| onStop() | Pending documentation |
| onGameOver() | Pending documentation |
| onFire(event) | Pending documentation  |
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