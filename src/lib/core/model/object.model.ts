import { FactoryBase } from "lib/core/factory-base";
import ParseInfo from "lib/core/model/parse-info.model";

/// TODO: Add a parameter to specify the pk name, and type
export default abstract class ObjectModel {

	private _cacheParser: Array<ParseInfo>
	get __factory(){
		return this._factory
	}

	get __parsersData(): Array<ParseInfo>{
		if (!this._cacheParser){
			var jsonProperties = this['__json'];
			this._cacheParser = jsonProperties.map(e=>{
				return new ParseInfo(e.key, this, e.property, new e.transform(this._factory.service) )
			})
		}
		return this._cacheParser;
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
