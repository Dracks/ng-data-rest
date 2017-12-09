import { RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";


import ObjectModel from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";

export default abstract class Adapter {
	abstract createElement(e: ObjectModel): Observable<ObjectModel>;
	abstract retrieveElement(e: ObjectModel, id: any): Observable<ObjectModel>;
	abstract retrieveListElements(e: ObjectModel, options: any): Observable<ListModel>;
	abstract updateElement(e: ObjectModel): Observable<ObjectModel>;
	abstract saveElement(e: ObjectModel): Observable<ObjectModel>;

}
