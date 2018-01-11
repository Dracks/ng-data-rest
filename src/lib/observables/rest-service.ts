import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { RestManagerService } from "lib/core/rest-manager.service";
import ConstructorBase from "lib/core/model/constructor-base.interface";
import { ObjectModel } from "lib/observables";
import ListModel from "lib/core/model/list.model";


@Injectable()
class RestService {
	constructor(private service: RestManagerService){}

	getObject<T extends ObjectModel>(TCreator: ConstructorBase<T>): T {
		return this.service.retrieve(TCreator).getInstance();
	}

	query<T extends ObjectModel>(TCreator: ConstructorBase<T>, options: any={}): Observable<ListModel<T>>{
		var factory = this.service.retrieve(TCreator);
		return this.service.adapter.retrieveListElements(factory, options) as Observable<ListModel<T>>
	}

}

export default RestService;
