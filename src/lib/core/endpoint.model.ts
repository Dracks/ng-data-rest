import ObjectModel from "lib/core/model/object.model";
import ConstructorBase from "lib/core/model/constructor-base.interface";

export class EndpointModel<T extends ObjectModel> {
	endpoint: string;
	namespace: string;

	name: string;

	constructor(public creator: ConstructorBase<T>){
		this.name = creator.name;
	}
}
