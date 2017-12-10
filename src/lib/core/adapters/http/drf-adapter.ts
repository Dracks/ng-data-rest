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

	getObject(object: ObjectModel){
		var data: any = {};
        var jsonProperties = object['__json'];
        for (var i in jsonProperties){
            var e = jsonProperties[i];
            if (object[e.property]!== undefined){
                data[e.key] = e.transform.serialize(object[e.property]);
            }
        }
        return data;
	}

	assignData(object: ObjectModel, data: any): ObjectModel{
		var jsonProperties = object['__json']
        for (var i in jsonProperties){
            var e = jsonProperties[i]
            if (data[e.key] !== undefined){
                object[e.property] = e.transform.serialize(data[e.key]);
            }
        }
        return object;
	}

	createElement(e: ObjectModel): Observable<ObjectModel> {
		return this.request(new Request(new RequestOptions({
			method: RequestMethod.Post,
			body: this.getObject(e)
		}))).map((response)=>this.assignData(e, response.json()))
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
		throw new Error("Method not implemented.");
	}


}

export default DrfAdapter;
