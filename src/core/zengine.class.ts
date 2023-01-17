import { Container } from 'inversify';

export class zEngine {
    private static instance: zEngine;

    ioc: Container;
    controllers: any[];

    private constructor(controllers: any[]) {
        this.ioc = new Container({
            autoBindInjectable: true,
            defaultScope: 'Singleton',
        });
        this.controllers = controllers;
        this.initializeInstances();
    }

    private initializeInstances() {
        for (const controller of this.controllers) {
            this.ioc.get(controller);
        }
    }

    static initialize(controllers: any[]) {
        if (!this.instance) {
            this.instance = new zEngine(controllers);
        }
        return this.instance;
    }
}
