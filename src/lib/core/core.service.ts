import { Injectable } from "@angular/core";

import { Eater } from "lib/utils/buffer";

import { DEFAULT_QUEUE } from "./register-model.decorator";
import { FactoryBase } from "./factory-base";
import { ObjectModel } from "lib/core/object.model";

export var registerHash = {}

@Injectable()
export class CoreService implements Eater<any> {
	registered: {};

	constructor(){
		this.registered = {};
		registerHash[DEFAULT_QUEUE].delegate = this;
	}

	newValue(TCreator: any) {
		this.registered[TCreator.name] = new FactoryBase(this);
	}

	retrieve<T extends ObjectModel>(TCreator: { new (Http, IConfig, RestService): T; }){
        var factory =  this.registered[TCreator.name];
        if (factory == undefined){
            throw new Error("Model "+TCreator.name+" is not registered");
        }
        return factory;
    }
}
