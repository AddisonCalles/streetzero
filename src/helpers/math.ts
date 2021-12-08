

export const random = (max:number, min:number) => Math.random() * (max - min) + min;

export const angleBetweenPoints = (p1:{x:number, y:number}, p2:{x:number, y:number}) => Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

export const vectorComponents = (direction:number, velocity:number) => {
    const radians = direction * Math.PI / 180;
    return { x: (velocity * Math.cos(radians)), y: (velocity * Math.sin(radians)) };
}

export const vectorByXY = (vX:number, vY:number) => {
    return {vel: Math.abs(((vX ** 2) + (vY ** 2)) ** 1 / 2), dir: Math.atan(vY / vX)}
}
