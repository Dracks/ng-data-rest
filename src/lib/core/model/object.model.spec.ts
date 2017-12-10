import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";
import ListModel from "lib/core/model/list.model";

import { SampleEmptyObjectModel } from "lib/core/test-mocks/object.model";
import { RegisterRest, DEFAULT_QUEUE } from "lib/core/register-model.decorator";
import { registerHash, RestManagerService } from "lib/core/rest-manager.service";
import { Buffer } from 'lib/utils/buffer';
import { EndpointModel } from "lib/core/endpoint.model";
import Adapter from "lib/core/adapters/adapter.model";
import { mockObject } from "../../../../libs/mocks/mock";
import ObjectModel from "lib/core/model/object.model";
import MockAdapter from "lib/core/test-mocks/mock-adapter";

describe('[ObjectModel]', ()=>{
	var subject: SampleEmptyObjectModel
	var adapterMock: any;
	var service: RestManagerService


	beforeEach(()=>{
		registerHash[DEFAULT_QUEUE] = new Buffer<EndpointModel<any>>();
		var register = RegisterRest({})
		adapterMock = mockObject(MockAdapter);
		TestBed.configureTestingModule({
			providers: [
				RestManagerService,
				{ provide: Adapter, useValue: adapterMock }
			]
		});
		register(SampleEmptyObjectModel);
		service = TestBed.get(RestManagerService);
		subject = service.retrieve(SampleEmptyObjectModel).getInstance();
	})

	it('Is creating it', ()=>{
		expect(subject).toBeTruthy()
	})

	it('Save new object', ()=>{
		adapterMock.createElement.and.callFake(()=>Observable.of({}))
		subject.save().subscribe((e)=>{});
		expect(adapterMock.createElement).toHaveBeenCalledWith(subject);
		expect(subject.isNew).toBe(false);
	});

	it('Save old instance', ()=>{
		subject.isNew = false;
		subject.save();
		expect(adapterMock.updateElement).toHaveBeenCalledWith(subject);
	})
})
