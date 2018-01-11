import { RequestOptions, Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import ObjectModel from "lib/core/model/object.model";
import HttpAdapter from "lib/core/adapters/http/http.abstract";
import ListModel from "lib/core/model/list.model";
import { Request, RequestMethod } from "@angular/http";
import { FactoryBase } from "lib/core/factory-base";

@Injectable()
class DrfAdapter extends HttpAdapter {
	constructor(http: Http) {
		super(http);
	}

	createElement(e: ObjectModel): Observable<ObjectModel> {
		const url = this.getEndpoint(e.__factory.endpoint);
		return this.request({
			url: url,
			method: RequestMethod.Post,
			body: this.getObject(e)
		}).map((response)=>this.assignData(e, response.json()));
	}

	retrieveElement(factory: FactoryBase<ObjectModel>, id: any): Observable<ObjectModel> {
		var e= factory.getInstance();
		e[e.getPkKey()]=id;
		const url = this.getEndpointForObject(e);
		return this.request({
			url: url,
			method: RequestMethod.Get
		}).map((response)=>this.assignData(e, response.json()));
	}

	retrieveListElements(factory: FactoryBase<ObjectModel>, options: any): Observable<ListModel<ObjectModel> > {
		throw new Error("Method not implemented.");
	}

	updateElement(e: ObjectModel): Observable<ObjectModel> {
		const url = this.getEndpointForObject(e);
		return this.request({
			url: url,
			method: RequestMethod.Put,
			body: this.getObject(e)
		}).map((response)=>this.assignData(e, response.json()));
	}

	deleteElement(e: ObjectModel): Observable<boolean> {
		throw new Error("Method not implemented.");
	}
}

export default DrfAdapter;