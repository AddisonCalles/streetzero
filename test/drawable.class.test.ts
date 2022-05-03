import 'jest-canvas-mock';
import { Drawable } from "../src/drawable.class";
const canvas = document.createElement('canvas');
document.body.prepend(canvas);
test('public Fields [x,y,x2,y2,canvas,context,rotation,offset,width,height]', () => {
    const draw = new Drawable(canvas, 1, 2, 30, 33);
    expect(draw).toHaveProperty('x', 1);
    expect(draw).toHaveProperty('y', 2);
    expect(draw).toHaveProperty('x2', 31);
    expect(draw).toHaveProperty('y2', 35);
    expect(draw).toHaveProperty('canvas', canvas);
    expect(draw).toHaveProperty('context', canvas.getContext('2d'));
    expect(draw).toHaveProperty('rotation', 0);
    expect(draw).toHaveProperty('offset.x', 0);
    expect(draw).toHaveProperty('offset.y', 0);
    expect(draw).toHaveProperty('width', 30);
    expect(draw).toHaveProperty('height', 33);
});   

test('set offset', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    expect(draw).toHaveProperty('offset.x', 15);
    expect(draw).toHaveProperty('offset.y', 20);
    expect(draw).toHaveProperty('x', 20);
    expect(draw).toHaveProperty('y', 25);
});   
test('move', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    draw.move(5,5)
    expect(draw).toHaveProperty('x', 25);
    expect(draw).toHaveProperty('y', 30);
});   
test('rotate(grades)', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    draw.rotate(1);
    expect(draw).toHaveProperty('rotation', 1);
    draw.rotate(200);
    expect(draw).toHaveProperty('rotation', 201);
    draw.rotate(-200);
    expect(draw).toHaveProperty('rotation', 1);
});   

test('setPos(x,y)', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    draw.setPos(10, 20);
    expect(draw).toHaveProperty('x', 25);
    expect(draw).toHaveProperty('y', 40);
})

test('centerOffset()', () => {
    const draw = new Drawable(canvas, 5, 10, 30, 40);
    draw.centerOffset();
    expect(draw).toHaveProperty('offset.x', 30/2);
    expect(draw).toHaveProperty('offset.y', 40/2);
    expect(draw).toHaveProperty('x', 5+(30/2));
    expect(draw).toHaveProperty('y', 10+(40/2));
})