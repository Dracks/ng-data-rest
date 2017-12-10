import { RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";


import ObjectModel from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";
import { EndpointModel } from "lib/core/endpoint.model";
import { StringUtils } from "lib/utils/string";

export default abstract class Adapter {
	abstract createElement(e: ObjectModel): Observable<ObjectModel>;
	abstract retrieveElement(e: ObjectModel, id: any): Observable<ObjectModel>;
	abstract retrieveListElements(e: ObjectModel, options: any): Observable<ListModel>;
	abstract updateElement(e: ObjectModel): Observable<ObjectModel>;
	abstract saveElement(e: ObjectModel): Observable<ObjectModel>;

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
