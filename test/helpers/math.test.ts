

import { random, vectorComponents, angleBetweenPoints } from '../../src/helpers/math';
test('Math random helper', ()=>{
        const randNumber = random(55,59);
        expect(randNumber >= 55);
        expect(randNumber <= 59);
})
test('Math vector vx vy helper (60 grades, 10 units)', ()=>{
    const vector = vectorComponents(60, 10);
    expect(vector.x).toEqual(5.000000000000001);
    expect(vector.y).toEqual(8.660254037844386)
});
test('Math vector vx vy helper (30 grades, 10 units)', ()=>{
    const vector = vectorComponents(30, 10);
    expect(vector.x).toEqual(8.660254037844387);
    expect(vector.y).toEqual(4.999999999999999);
});
test('Math angle between 2 points (0.8,0.6) y (1,0.75)', ()=>{
    const angle = angleBetweenPoints({x:0.8,y:0.6},{x:1, y:0.75});
    expect(angle).toEqual(36.869897645844034);
});
test('Math angle between 2 points (90, 180, -90, 0 grades)', ()=>{
    const angle90 = angleBetweenPoints({x:0,y:0},{x:0, y:1});
    expect(angle90).toEqual(90);
    const angle0 = angleBetweenPoints({x:0,y:0},{x:0, y:0});
    expect(angle0).toEqual(0);
    const angle180 = angleBetweenPoints({x:0,y:0},{x:-1, y:0});
    expect(angle180).toEqual(180);
    const angle270 = angleBetweenPoints({x:0,y:1},{x:0, y:0});
    expect(angle270).toEqual(-90);
});
