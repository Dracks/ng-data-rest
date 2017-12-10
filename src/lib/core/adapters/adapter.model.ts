import { RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";


import ObjectModel from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";
import { EndpointModel } from "lib/core/endpoint.model";
import { StringUtils } from "lib/utils/string";
import { FactoryBase } from "lib/core/factory-base";

export default abstract class Adapter {
	abstract createElement(e: ObjectModel): Observable<ObjectModel>;
	abstract retrieveElement(factory: FactoryBase<ObjectModel>, id: any): Observable<ObjectModel>;
	abstract retrieveListElements(factory: FactoryBase<ObjectModel>, options: any): Observable<ListModel>;
	abstract updateElement(e: ObjectModel): Observable<ObjectModel>;
	abstract deleteElement(e: ObjectModel):Observable<boolean>;

	getEndpoint(data: EndpointModel<ObjectModel>){
		var endpoint = '/';
		if (data.namespace){
			endpoint += data.namespace+'/';
		}

		if (!data.endpoint){
			var name = data.name;
			if (name.substr(-5, 5) == "Model"){
				name = name.substr(0, name.length-5);
			}
			endpoint += StringUtils.snakize(name);
		} else {
			endpoint += data.endpoint;
		}
		return endpoint;
	}
}
