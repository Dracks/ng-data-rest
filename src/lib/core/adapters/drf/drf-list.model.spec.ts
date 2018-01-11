import { Http } from '@angular/http';

import DrfListModel from './drf-list.model';
import { SampleEmptyObjectModel } from 'lib/core/test-mocks/object.model';
import DrfAdapter from 'lib/core/adapters/drf/drf-adapter';
import { mockObject } from '../../../../../libs/mocks/mock';
import { FactoryBase } from 'lib/core/factory-base';
import { RestManagerService } from 'lib/core/rest-manager.service';
import { EndpointModel } from 'lib/core/endpoint.model';

describe('[DrfListModel', ()=>{
	var subject : DrfListModel<SampleEmptyObjectModel>;
	var adapter: DrfAdapter;
	var httpMock: Http;
	var factory: FactoryBase<SampleEmptyObjectModel>;
	var restManagerMock: any;

	beforeEach(()=>{
		httpMock = mockObject(Http);
		adapter = new DrfAdapter(httpMock)
		restManagerMock = mockObject(RestManagerService);
		restManagerMock.adapter = adapter;
		factory = new FactoryBase(restManagerMock, new EndpointModel(SampleEmptyObjectModel));
		subject = new DrfListModel<SampleEmptyObjectModel>(factory)
	})

	it('Creating ok!', ()=>{
		expect(subject).toBeTruthy();
	})

	it('Loading Data', ()=>{
		subject.loadFromJson({
			results:[{"pk":"5"},{}]
		})
		var data = subject.data as SampleEmptyObjectModel[];
		expect(data).toBeTruthy()
		expect(data.length).toBe(2);
		expect(data[0] instanceof SampleEmptyObjectModel).toBeTruthy();
		expect(data[0].pk).toBe("5")
	})
});
