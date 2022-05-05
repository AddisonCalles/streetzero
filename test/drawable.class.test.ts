import 'jest-canvas-mock';
import { Drawable } from "../src/drawable.class";
import Kinematic from '../src/kinematic.class';
import { LayerPath } from '../src/layerPath.class';
const canvas = document.createElement('canvas');
document.body.prepend(canvas);
const newcanvas = document.createElement('canvas');
document.body.prepend(newcanvas);
(function mockDOMMatrix() {
    class DOMMatrixMock extends DOMMatrix {
        scale = jest.fn().mockImplementation((scaleX, scaleY) => this.setScale(scaleX, scaleY));
        translate = jest.fn().mockImplementation((x, y) => this.setTranslate(x,y));
  
        setScale(scaleX:number, scaleY:number) {
            this.f = scaleY;
            this.e = scaleX;
            return this;
        }
  
        setTranslate(x:number,y:number){
            this.b = x;
            this.c = y;
            return this;
        }
    }
    
    global.DOMMatrix = DOMMatrixMock;
  })();

beforeAll(() => {

});
test('setCanvas', () => {
    const draw = new Drawable(canvas, 1, 2, 30, 33);
    expect(draw.setCanvas(newcanvas)).toBeUndefined();
    expect(draw.canvas).toBe(newcanvas);
    expect(draw.context).toBe(newcanvas.getContext('2d'));
    
});   
test('public Fields [x,y,x2,y2,canvas,context,rotation,offset,width,height]', () => {
    const draw = new Drawable(canvas, 1, 2, 30, 33);
    expect(draw.x).toBe(1);
    expect(draw.y).toBe(2);
    expect(draw.x2).toBe(31);
    expect(draw.y2).toBe(35);
    expect(draw.canvas).toBe(canvas);
    expect(draw.context).toBe(canvas.getContext('2d'));
    expect(draw.rotation).toBe(0);
    expect(draw.offset.x).toBe( 0);
    expect(draw.offset.y).toBe( 0);
    expect(draw.width).toBe(30);
    expect(draw.height).toBe(33);
});   

test('set offset', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    expect(draw.offset.x).toBe(15);
    expect(draw.offset.y).toBe(20);
    expect(draw.x).toBe(20);
    expect(draw.y).toBe(25);
});   
test('move', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    draw.move(5,5)
    expect(draw.x).toBe(25);
    expect(draw.y).toBe(30);
});   
test('rotate(grades)', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    draw.rotate(1);
    expect(draw.rotation).toBe(1);
    draw.rotate(200);
    expect(draw.rotation).toBe(201);
    draw.rotate(-200);
    expect(draw.rotation).toBe(1);
});   

test('setPos(x,y)', () => {
    const draw = new Drawable(canvas, 5, 5, 30, 30);
    draw.offset = {x: 15, y: 20};
    draw.setPos(10, 20);
    expect(draw.x).toBe(25);
    expect(draw.y).toBe(40);
})

test('centerOffset()', () => {
    const draw = new Drawable(canvas, 5, 10, 30, 40);
    draw.centerOffset();
    expect(draw.offset.x).toBe(30/2);
    expect(draw.offset.y).toBe(40/2);
    expect(draw.x).toBe(5+(30/2));
    expect(draw.y).toBe(10+(40/2));
})


test('Leyer render', () => {
    const draw = new Drawable(canvas, 5, 10, 30, 40);
    const wall = new Path2D();
     wall.moveTo(0,0);
     wall.rect(0,20,30,20);
     wall.rect(0,0,30,-20);
     draw.setLeyers([new LayerPath(wall, "red", new Kinematic(canvas, 5, 10, 30, 40))]);
     //draw.render(); Error TypeError: DOMMatrix.fromMatrix is not a function
}) 