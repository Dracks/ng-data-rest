import { Http, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import ObjectModel from "lib/core/model/object.model";
import Adapter from "lib/core/adapters/adapter.model";

export default abstract class HttpAdapter extends Adapter {
	constructor(private http: Http){
		super();
	}

	protected getEndpointForObject(object: ObjectModel){
		var endpoint = this.getEndpoint(object.__factory.endpoint);
		endpoint += '/' + object[object.getPkKey()];
		return endpoint;
	}

	protected getObject(object: ObjectModel){
		var data: any = {};
		object.__parsersData.forEach(element => {
			const value = element.serialize();
			if (value){
				data[element.key] = value;
			}
		});
        return data;
	}

	protected assignData(object: ObjectModel, data: any): ObjectModel{
		object.__parsersData.forEach(element => {
			const value = data[element.key];
			if (value){
				element.unserialize(value);
			}
		})

        return object;
	}

	protected request(req: Request, instance: ObjectModel): Observable<ObjectModel>{
		return this.http.request(req).map((response)=>this.assignData(instance, response.json()));
	}
}
