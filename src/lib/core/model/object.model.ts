import { FactoryBase } from "lib/core/factory-base";


/// TODO: Add a parameter to specify the pk name, and type
export default abstract class ObjectModel {
	get __factory(){
		return this._factory
	}
	constructor(private _factory: FactoryBase<any>){}
	abstract getPkKey():string
}
class ObjectModelWithStringPk extends ObjectModel{
	getPkKey(): string {
		return 'pk';
	}
}
export{ ObjectModelWithStringPk}
