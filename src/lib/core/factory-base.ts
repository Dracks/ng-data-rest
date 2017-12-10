import ObjectModel from "./model/object.model";
import { RestManagerService } from "lib/core/rest-manager.service";
import ConstructorBase from "lib/core/model/constructor-base.interface";
import { EndpointModel } from "lib/core/endpoint.model";


export class FactoryBase<T extends ObjectModel>{

	constructor(private core: RestManagerService, private objectInfo: EndpointModel<T>)
	{

	}

	getInstance(): T {
		return new this.objectInfo.creator();
	}

}
