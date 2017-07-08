import { TestBed, inject } from '@angular/core/testing';

import { CoreService, registerHash } from './core.service';
import { SampleEmptyObjectModel } from './test-mocks/object.model';
import { RegisterRest } from "lib/core/register-model.decorator";


describe('CoreService', () => {
	var subject: CoreService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CoreService
			]
		});
		subject = TestBed.get(CoreService)
		var f=RegisterRest()
		f(SampleEmptyObjectModel);
	});

	it('should be created',() => {
		expect(subject).toBeTruthy();
	});

	it('Should register the object',()=>{
		expect(subject.retrieve(SampleEmptyObjectModel)).not.toBeNull();
	});
});
