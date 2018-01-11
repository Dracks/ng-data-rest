import { Http, Request, Response, RequestOptions } from "@angular/http";
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

	public getObject(object: ObjectModel){
		var data: any = {};
		object.__parsersData.forEach(element => {
			const value = element.serialize();
			if (value){
				data[element.key] = value;
			}
		});
        return data;
	}

	public assignData(object: ObjectModel, data: any): ObjectModel{
		object.__parsersData.forEach(element => {
			const value = data[element.key];
			if (value){
				element.unserialize(value);
			}
		})

        return object;
	}

	protected request(req: any): Observable<Response>{
		var requestObject = new Request(new RequestOptions(req));
		return this.http.request(requestObject)
	}
}
