
import { TestBed } from "@angular/core/testing";
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend, RequestOptions, Http } from "@angular/http";

import { RequestService } from "./requests.service";

describe('Requests', () => {

	var subject: RequestService;

	beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
				{ provide: XHRBackend, useClass: MockBackend },
                RequestService
            ]
		});

		subject = TestBed.get(RequestService);
	});

	it('Call Get on single', ()=>{
		var e = new RequestOptions({
			method: 'GET',

		});
		subject.requestSingle(e);
	});
});
