import { TestBed } from "@angular/core/testing";

import { RestService } from "lib/observables";
import { SampleEmptyObjectModel } from "lib/core/test-mocks/object.model";
import { mockObject } from "../../../libs/mocks/mock";
import { RestManagerService } from "lib/core/rest-manager.service";
import { FactoryBase } from "lib/core/factory-base";
import { EndpointModel } from "lib/core/endpoint.model";
import Adapter from "lib/core/adapters/adapter.model";
import MockAdapter from "lib/core/test-mocks/mock-adapter";
import { Observable } from "rxjs/Observable";


describe('[RestService]', ()=>{
	var subject :RestService;
	var restMock : any;
	var adapterMock: any;

	const retrieveSample = () =>{
		restMock.retrieve.and.callFake(()=>new FactoryBase(restMock, new EndpointModel(SampleEmptyObjectModel)))
		return subject.getObject(SampleEmptyObjectModel);
	}

	beforeEach(()=>{
		restMock = mockObject(RestManagerService);
		TestBed.configureTestingModule({
			providers: [
				RestService,
				{ provide: RestManagerService, useValue: restMock }
			]
		})
		subject = TestBed.get(RestService);
		adapterMock = mockObject(MockAdapter)
		restMock.adapter = adapterMock
	})

	it('Created it?', ()=>{
		expect(subject).toBeTruthy();
	})

	it('New Object instance', ()=>{
		var sample: SampleEmptyObjectModel = retrieveSample();
		expect(sample).toBeTruthy();
		expect(sample instanceof SampleEmptyObjectModel).toBe(true);
	})

	it('Saving element', ()=>{
		var sample: SampleEmptyObjectModel = retrieveSample();
		var obs = Observable.of({})
		var ret = false;
		adapterMock.createElement.and.callFake(()=>obs);
		var r=sample.save();
		r.subscribe(()=>{
			ret = true;
		});
		expect(ret).toBe(true);
		expect(adapterMock.createElement).toHaveBeenCalledWith(sample);
	});


});
