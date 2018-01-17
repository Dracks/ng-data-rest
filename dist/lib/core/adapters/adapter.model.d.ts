import { Observable } from "rxjs/Observable";
import ObjectModel from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";
import { EndpointModel } from "lib/core/endpoint.model";
import { FactoryBase } from "lib/core/factory-base";
export default abstract class Adapter {
    abstract createElement(e: ObjectModel): Observable<ObjectModel>;
    abstract retrieveElement(factory: FactoryBase<ObjectModel>, id: any): Observable<ObjectModel>;
    abstract retrieveListElements(factory: FactoryBase<ObjectModel>, options: any): Observable<ListModel<ObjectModel>>;
    abstract updateElement(e: ObjectModel): Observable<ObjectModel>;
    abstract deleteElement(e: ObjectModel): Observable<boolean>;
    getEndpoint(data: EndpointModel<ObjectModel>): string;
}
