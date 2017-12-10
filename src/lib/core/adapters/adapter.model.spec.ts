import Adapter from "lib/core/adapters/adapter.model";
import ObjectModel from "lib/core/model/object.model";
import { Observable } from "rxjs";
import ListModel from "lib/core/model/list.model";
import { EndpointModel } from "lib/core/endpoint.model";
import { SampleEmptyObjectModel } from "lib/core/test-mocks/object.model";


class AdapterMock extends Adapter{
	createElement(e: ObjectModel): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
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
describe('[Adapter]', ()=>{
	var subject :Adapter;

	beforeEach(()=>{
		subject = new AdapterMock();
	})

	it('Check endpoint Base without information', ()=>{
		const endpoint = new EndpointModel(SampleEmptyObjectModel);

		expect(subject.getEndpoint(endpoint)).toBe('/sample-empty-object');
	});

	it('Check endpoint Base with information', ()=>{
		const endpoint = new EndpointModel(SampleEmptyObjectModel);
		endpoint.endpoint='dalek';
		endpoint.namespace='namespace';

		expect(subject.getEndpoint(endpoint)).toBe('/namespace/dalek');
	});
})
