import { TestBed, inject } from '@angular/core/testing';

import { RestManagerService, registerHash } from './rest-manager.service';
import { SampleEmptyObjectModel } from './test-mocks/object.model';
import { RegisterRest } from "lib/core/register-model.decorator";
import Adapter from "lib/core/adapters/adapter.model";


describe('[RestManagerService]', () => {
	var subject: RestManagerService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RestManagerService,
				{ provide: Adapter, iseInstance: {} },
			]
		});
		subject = TestBed.get(RestManagerService)
		var f=RegisterRest({})
		f(SampleEmptyObjectModel);
	});

	it('should be created',() => {
		expect(subject).toBeTruthy();
	});

	it('Should register the object',()=>{
		expect(subject.retrieve(SampleEmptyObjectModel)).not.toBeNull();
	});
});
