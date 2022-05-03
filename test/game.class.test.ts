import 'jest-canvas-mock';
import { Game } from "../src/game.class";
const canvas = document.createElement('canvas');
document.body.prepend(canvas);
jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

test('Game Main loop Events', () => {
    const testOnStop = jest.fn();
    const testOnStart = jest.fn();
    const testOnGameOver = jest.fn();
    const testOnPreload = jest.fn();
    const testOnRender = jest.fn();
    class MockGame extends Game {
        onStart() { testOnStart(); }
        onStop() { testOnStop() }
        onGameOver() { testOnGameOver() }
        onPreload() { testOnPreload() }
        onRender() { testOnRender() }
    }

    var game = new MockGame(canvas);
    //Start Step
    game.play();
    game.start();
    expect(testOnStart).lastCalledWith();
    expect(testOnPreload).lastCalledWith();
    expect(game.isPlay).toBe(true);
    expect(game.points).toBe(0);
    expect(game.canvas).toBe(canvas);
    expect(game.gameOver).toBe(false);
    expect(game.level).toBe(0);

    const counterCalls = 10;
    //Render
    Array.from({ length: counterCalls }, (_, i) => i + 1).forEach(() => {
        jest.runOnlyPendingTimers(); //Run first iteration loop
    });
    expect(testOnRender).nthCalledWith(counterCalls);
});


test('Levels & Points Events', () => {
    const testOnPreload = jest.fn();
    const testOnRender = jest.fn();
    const testOnNextLevel = jest.fn();
    const testOnNexLevelPress = jest.fn();
    class MockGame extends Game {
        onPreload() { testOnPreload() }
        onRender() { testOnRender() }
        onNextLevel() { testOnNextLevel() }
        onNexLevelPress() { testOnNexLevelPress() }
    }
    var game = new MockGame(canvas);
    //Next Level
    game.nextLevel(0);
    expect(testOnNexLevelPress).lastCalledWith();
    game.nextLevel(0);
    jest.runOnlyPendingTimers(); //Run intervals
    expect(testOnNextLevel).lastCalledWith();
    expect(game.level).toBe(2);
    expect(game.clearCanvas()).toBeUndefined();


    //Point increce
    game.incrementPoints(40);
    expect(game.points).toBe(40);
    game.incrementPoints(-4);
    expect(game.points).toBe(36);
})