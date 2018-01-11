import { FactoryBase } from "lib/core/factory-base";
import ParseInfo from "lib/core/model/parse-info.model";
import { Observable } from "rxjs/Observable";
import JsonProperty from "lib/core/decorators/register-property";

/// TODO: Add a parameter to specify the pk name, and type
export default abstract class ObjectModel {

	private _cacheParser: Array<ParseInfo>
	isNew: boolean;

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

	constructor(private _factory: FactoryBase<any>){
		this.isNew = true;
	}

	save(): Observable<ObjectModel>{
		if (this.isNew){
			var r= this._factory.adapter.createElement(this);
			return r.do(()=>{this.isNew=false});
		} else {
			this._factory.adapter.updateElement(this);
		}
	}

	abstract getPkKey():string
}


class ObjectModelWithStringPk extends ObjectModel{
	@JsonProperty({})
	pk: string;

	getPkKey(): string {
		return 'pk';
	}
}
export{ ObjectModelWithStringPk}
