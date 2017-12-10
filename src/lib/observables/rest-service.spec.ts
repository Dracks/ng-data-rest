import { TestBed } from "@angular/core/testing";
import { RestService } from "lib/observables";
import { SampleEmptyObjectModel } from "lib/core/test-mocks/object.model";
import { mockObject } from "../../../libs/mocks/mock";
import { RestManagerService } from "lib/core/rest-manager.service";
import { FactoryBase } from "lib/core/factory-base";
import { EndpointModel } from "lib/core/endpoint.model";


describe('[RestService]', ()=>{
	var subject :RestService;
	var restMock : any
	beforeEach(()=>{
		restMock = mockObject(RestManagerService);
		TestBed.configureTestingModule({
			providers: [
				RestService,
				{ provide: RestManagerService, useValue: restMock }
			]
		})
		subject = TestBed.get(RestService);
	})

	it('Created it?', ()=>{
		expect(subject).toBeTruthy();
	})

	it('New Object instance', ()=>{
		var sample: SampleEmptyObjectModel;
		restMock.retrieve.and.callFake(()=>new FactoryBase(restMock, new EndpointModel(SampleEmptyObjectModel)))
		sample = subject.getObject(SampleEmptyObjectModel);
		expect(sample).toBeTruthy();
		expect(sample instanceof SampleEmptyObjectModel).toBe(true);
	})
});
