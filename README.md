# Street Zero

![GitHub stars](https://img.shields.io/github/stars/AddisonCalles/streetzero) ![Github forks](https://img.shields.io/github/forks/AddisonCalles/streetzero) ![GitHub license](https://img.shields.io/github/license/AddisonCalles/streetzero) ![Github issues](https://img.shields.io/github/issues/AddisonCalles/streetzero)

## Coverage

| Statements                                                                            | Branches                                                                       | Functions                                                                        | Lines                                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-81.98%25-yellow.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-66.95%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-71.42%25-red.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-81.81%25-yellow.svg?style=flat) |

This package is in construction.

This is a Micro Framework to make Game 2D using canvas HTML.

You can see how use this framework in this github repository:

#### Example 1: https://github.com/AddisonCalles/shoot-space.git

#### Example 2: https://github.com/AddisonCalles/flappy_space

# How to start

---

## Instalation

---

1. Install package:

```bash
npm i streetzero -g
```

## Make Project

1. run streetzero CLI

```bash
streetzero
```

2. Select the option 1.

```bash
====================================
STREET ZERO - MAIN MENU
====================================
? What do you need to do? (Use arrow keys)
❯ 1.- Start a new project.
  2.- Create new component.
```

3. Write your name project.

```bash
====================================
STREET ZERO - INIT PROJECT MENU
====================================
? Name: YourNewProject
```

<b>Note:</b>
Despues de ingrsar el nombre y si has hecho todo bien, recibiras un mensaje de "success" en la consola.

```bash
====================================
STREET ZERO - INIT PROJECT MENU
====================================
? Name: Your project name
```

## Run

---

1. Move from the console to the project folder.

```bash
cd your_project_folder_path
```

2. Insall packages

```bash
npm install
```

3. run server

```bash
npm start
```

# Documentation

---

## Game Class

---

Extends this class to be able to create a recurring routine and manage the basic elements of the video game.

## Attributes

---

Overwrite any of these methods within your MyGame class

| Attribute                         |                                                                                                                                                                                                 Description                                                                                                                                                                                                  |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| start()                           |                                                                                                                                            Start the life cycle of the game. This method starts the frame rate loop that allows the game graphics to be rendered.                                                                                                                                            |
| stop()                            |                                                                                                                                                                                      Stopt the life cycle of the game.                                                                                                                                                                                       |
| play()                            |                                                                                                                                                                                      Set the `isPlay` property to true                                                                                                                                                                                       |
| pause()                           |                                                                                                                                                                                      Set the `isPlay` property to false                                                                                                                                                                                      |
| clearCanvas()                     |                                                                                                                                                                     Remove all elements rendered at the current frame within the canvas                                                                                                                                                                      |
| nextLevel(sleepOffset)            |                                                                                                                                                                                            Pending documentation                                                                                                                                                                                             |
| incrementPoints(increase?:number) |                                                                                                                     Allows to increase an amount by means of the `increase` parameter, if the `increase` parameter is not set, it will increase the value of the `points` property by 1                                                                                                                      |
| gameover                          |                                                                                                                         Boolean property, allows to obtain or set the value of the gameover state. Setting this property to `true` or `false` will not start or stop the game loop.                                                                                                                          |
| isPlay                            |                                                                              Boolean property, it allows to obtain the value of the true play property, this property is immediately after the play method is called, and it is false when the play method has not been called or immediately after the pause method is called.                                                                              |
| speed                             | Property of type number, allows obtain or setting the value of the speed at which the cycle of ticks per second is executed, <br>**Example**. If we set the speed to 60, that's roughly 60 frames per second. If you want to accurately get the actual number of frames per second use the `fps` property. <br>**Warning:** The value of the speed property must be set before calling the `start()` method. |
| points                            |                                                                                                                                Property of type number, It allows to obtain the accumulated points of the game. You can edit this property using the method `incrementPoints`                                                                                                                                |
| level                             |                                                                                                                                      Property of type number, It allows to obtain the value of the current game level. This value is edited via the `nextLevel` method.                                                                                                                                      |
| initTime                          |                                                                                                                                        Property of type number, allows to obtain the timestamp, in millisecods format, registered when calling the `start()` method.                                                                                                                                         |
| fps                               |                                                                                                                            Property of type number, it allows to obtain the rate of average frames per second (fps). This value is updated over the course of the game execution.                                                                                                                            |
| context                           |                                                                                                                                                                                 allows obtain the CanvasRenderingContext2D.                                                                                                                                                                                  |
| canvas                            |                                                                                                                                                                                        allow obtain the canvas object                                                                                                                                                                                        |

## Events

---

Overwrite any of these methods within your MyGame class

| Event                 |                                    Description                                    |
| :-------------------- | :-------------------------------------------------------------------------------: |
| onStart()             |  Este metodo se ejecuta cuando la funcion `start` de la clase padre es llamada.   |
| onStop()              |   Este metodo se ejecuta cuando la funcion `stop` de la clase padre es llamada.   |
| onGameOver()          | Este metodo se ejecuta cuando la funcion `gameOver` de la clase padre es llamada. |
| onFire(event)         |       Este metodo es llamado cuando se detecta el evento `click` del mouse        |
| onMouseMove(event)    |                               Pending documentation                               |
| onPreload()           |                               Pending documentation                               |
| onRender()            |                               Pending documentation                               |
| onTouchStart(event)   |                               Pending documentation                               |
| onTouchCancel(event)  |                               Pending documentation                               |
| onTouchEnd(event:any) |                               Pending documentation                               |
| onNextLevel()         |                               Pending documentation                               |
| onNexLevelPress()     |                               Pending documentation                               |
| onKeyDown(event)      |                               Pending documentation                               |
| onKeyUp(event: any)   |                               Pending documentation                               |

## Drawable Objects

---

#### Pending documentation

## Kinematiks

---

Example Rocket:

```javascript
import { Kinematic, LayerPath } from 'streetzero';
export class Rocket extends Kinematic {
  #primaryColor;
  constructor(color, x, y) {
    Sounds.shoot();
    super(x, y, 30, 10);
    this.#primaryColor = color;
    this.initLayer();
  }
  initLayer() {
    const shoot = new Path2D();
    const center = 5;
    shoot.moveTo(0, center - 2);
    shoot.lineTo(20, center - 2);
    shoot.lineTo(25, center);
    shoot.lineTo(20, center + 2);
    shoot.lineTo(0, center + 2);
    shoot.lineTo(0, center - 2);
    shoot.closePath();

    const flame = new Path2D();
    flame.ellipse(0, center, 10, 4, 0, 0, Math.PI * 2); // llama

    const flame2 = new Path2D();
    flame2.ellipse(2, center, 8, 2, 0, 0, Math.PI * 2); // llama

    super.setLeyers([
      new LayerPath(shoot, this.#primaryColor, this),
      new LayerPath(flame, 'red', this),
      new LayerPath(flame2, 'yellow', this),
    ]);
  }
}
```

### script: main.js

```javascript
import { Game } from './node_modules/streetzero/dist/streetzero.esm.js';
import { Rocket } from './Rocket.js';

export class MyGame extends Game {
  rocket;
  constructor(canvas) {
    super(canvas);
  }
  onRender() {
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

const canvas = document.getElementById('canvas');

const game = new MyGame(canvas);
game.start();
game.play();
```
