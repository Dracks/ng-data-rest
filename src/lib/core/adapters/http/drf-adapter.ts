import { RequestOptions, Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import ObjectModel from "lib/core/model/object.model";
import HttpAdapter from "lib/core/adapters/http/http.abstract";
import ListModel from "lib/core/model/list.model";
import { Request, RequestMethod } from "@angular/http";

@Injectable()
class DrfAdapter extends HttpAdapter {
	constructor(http: Http){
		super(http);
	}

	createElement(e: ObjectModel): Observable<ObjectModel> {
		const url = this.getEndpoint(e.__factory.endpoint);
		return this.request(new Request(new RequestOptions({
			url: url,
			method: RequestMethod.Post,
			body: this.getObject(e)
		})), e)
	}

	retrieveElement(e: ObjectModel, id: any): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	retrieveListElements(e: ObjectModel, options: any): Observable<ListModel> {
		throw new Error("Method not implemented.");
	}
	updateElement(e: ObjectModel): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	saveElement(e: ObjectModel): Observable<ObjectModel> {
		const url = this.getEndpointForObject(e);
		return this.request(new Request(new RequestOptions({
			url: url,
			method: RequestMethod.Put,
			body: this.getObject(e)
		})), e)
	}
}

export default DrfAdapter;
