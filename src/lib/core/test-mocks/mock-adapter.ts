import { Observable } from "rxjs";

import Adapter from "lib/core/adapters/adapter.model";
import ObjectModel from "lib/core/model/object.model";
import { FactoryBase } from "lib/core/factory-base";
import ListModel from "lib/core/model/list.model";


class MockAdapter extends Adapter{
	createElement(e: ObjectModel): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	retrieveElement(factory: FactoryBase<ObjectModel>, id: any): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	retrieveListElements(factory: FactoryBase<ObjectModel>, options: any): Observable<ListModel> {
		throw new Error("Method not implemented.");
	}
	updateElement(e: ObjectModel): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	deleteElement(e: ObjectModel): Observable<boolean> {
		throw new Error("Method not implemented.");
	}
}

export default MockAdapter;
