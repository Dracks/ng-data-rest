import { Injectable } from "@angular/core";

import { Eater } from "lib/utils/buffer";

import { DEFAULT_QUEUE } from "./register-model.decorator";
import { FactoryBase } from "./factory-base";
import ObjectModel from "lib/core/model/object.model";
import { EndpointModel } from "lib/core/endpoint.model";
import ConstructorBase from "lib/core/model/constructor-base.interface";
import Adapter from "lib/core/adapters/adapter.model";

export var registerHash = {}

@Injectable()
export class RestManagerService implements Eater<EndpointModel<any>> {
	registered: {};
	get adapter(){
		return this._adapter
	}

	constructor(private _adapter: Adapter){
		this.registered = {};
		registerHash[DEFAULT_QUEUE].delegate = this;
	}

	newValue(endpoint: EndpointModel<any>) {
		this.registered[endpoint.name] = new FactoryBase(this, endpoint);
	}

	retrieve<T extends ObjectModel>(TCreator: ConstructorBase<T>): FactoryBase<T>{
        var factory =  this.registered[TCreator.name];
        if (factory == undefined){
            throw new Error("Model "+TCreator.name+" is not registered");
        }
        return factory;
    }
}
