class RAManagerConfigurator {
    constructor(private context2D: CanvasRenderingContext2D) {
        this.context2D.fillStyle = '#ff2200';
    }
    render() {}
}

export class RAManager {
    private configurator: RAManagerConfigurator;
    constructor(private context2D: CanvasRenderingContext2D) {
        this.configurator = new RAManagerConfigurator(this.context2D);
    }

    renderUI() {
        this.configurator.render();
    }

    click(x: number, y: number) {
        console.log('click in: ', x, y);
    }

    pointer(x: number, y: number) {
        console.log('click in: ', x, y);
    }
}
