import { Injectable } from "@angular/core";
import { RestManagerService } from "lib/core/rest-manager.service";
import ConstructorBase from "lib/core/model/constructor-base.interface";
import { ObjectModel } from "lib/observables";


@Injectable()
class RestService {
	constructor(private service: RestManagerService){}

	getObject<T extends ObjectModel>(TCreator: ConstructorBase<T>): T {
		return this.service.retrieve(TCreator).getInstance();
	}

}

export default RestService;
