import { Observable } from "rxjs";
import { RestManagerService } from "lib/core/rest-manager.service";
import ConstructorBase from "lib/core/model/constructor-base.interface";
import { ObjectModel } from "lib/observables";
import ListModel from "lib/core/model/list.model";
declare class RestService {
    private service;
    constructor(service: RestManagerService);
    getObject<T extends ObjectModel>(TCreator: ConstructorBase<T>): T;
    query<T extends ObjectModel>(TCreator: ConstructorBase<T>, options?: any): Observable<ListModel<T>>;
    queryRecord<T extends ObjectModel>(TCreator: ConstructorBase<T>, pk: string): Observable<T>;
}
export default RestService;
