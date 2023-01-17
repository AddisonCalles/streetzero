export interface LayerDraw {
    rotate(direction: number):void;
    render():void;
    get rotation(): number;
    set rotation(value: number);
}
