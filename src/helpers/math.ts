
const presicion = 8;
export const random = (max:number, min:number) => Math.random() * (max - min) + min;

export const angleBetweenPoints = (p1:{x:number, y:number}, p2:{x:number, y:number}) => toFixed(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);

export const vectorComponents = (direction:number, velocity:number) => {
    const radians = convertToRadians(direction);
    return { x: toFixed((velocity * Math.cos(radians))), y: toFixed((velocity * Math.sin(radians))) };
}
export const convertToDegrees = (radians:number)=>(radians * 180)/ Math.PI;
export const convertToRadians = (degrees:number)=> (degrees * Math.PI) / 180;
export const vectorByXY = (vX:number, vY:number) => {
    const vel = toFixed(Math.sqrt((vX ** 2) + (vY ** 2)));
    const dir = toFixed(convertToDegrees(Math.atan2(vY,vX)));
    return {vel, dir}
}

export const toFixed = (num:number)=>parseFloat(num.toFixed(presicion));