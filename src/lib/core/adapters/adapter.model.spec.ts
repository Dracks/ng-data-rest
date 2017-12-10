import { Observable } from "rxjs";

import Adapter from "lib/core/adapters/adapter.model";
import ObjectModel from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";
import { EndpointModel } from "lib/core/endpoint.model";
import { SampleEmptyObjectModel } from "lib/core/test-mocks/object.model";
import MockAdapter from "lib/core/test-mocks/mock-adapter";

describe('[Adapter]', ()=>{
	var subject :Adapter;

	beforeEach(()=>{
		subject = new MockAdapter();
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
