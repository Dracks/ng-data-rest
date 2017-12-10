import { Http, Request, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import ObjectModel from "lib/core/model/object.model";
import Adapter from "lib/core/adapters/adapter.model";

export default abstract class HttpAdapter extends Adapter {
	constructor(private http: Http){
		super();
	}

	protected getObject(object: ObjectModel){
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

	protected assignData(object: ObjectModel, data: any): ObjectModel{
		var jsonProperties = object['__json']
        for (var i in jsonProperties){
            var e = jsonProperties[i]
            if (data[e.key] !== undefined){
                object[e.property] = e.transform.serialize(data[e.key]);
            }
        }
        return object;
	}

	protected request(req: Request): Observable<Response>{
		return this.http.request(req);
	}
}
