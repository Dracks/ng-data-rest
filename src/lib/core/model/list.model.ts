import ObjectModel from "lib/core/model/object.model";
import { FactoryBase } from "lib/core/factory-base";

export default abstract class ListModel<T extends ObjectModel> {
	protected _data: T[];
	protected _meta: any;

	get data(){
		return this._data;
	}

	constructor(protected _factory: FactoryBase<T>){
		this._data=[];
	}

	abstract loadFromJson(obj: any)

}
