import { TestBed } from "@angular/core/testing";
import { MockBackend } from '@angular/http/testing';
import {
	HttpModule,
	XHRBackend,
	RequestOptions,
	Http,
	Request,
	Response,
	ResponseOptions,
	RequestMethod
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

import DrfAdapter from "./drf-adapter";
import ObjectModel,{ ObjectModelWithStringPk } from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";
import JsonProperty from "lib/core/decorators/register-property";

class MockModel extends ObjectModelWithStringPk{
	@JsonProperty({})
	pk: string
}


describe('Django Rest Framework Adapter', () => {
	var subject: DrfAdapter;
	var requestSpied: any;
	var responseMock: Observable<Response>;
	var lastRequest: Request;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				{ provide: Http, useInstance: {} },
				DrfAdapter
			]
		});

		subject = TestBed.get(DrfAdapter);

		lastRequest = null;
		subject['request'] = (req: Request)=>{
			lastRequest = req;
			return responseMock;
		}
	});

	function checkRequest(method: RequestMethod, body: any){
		expect(lastRequest).toBeTruthy();
		expect(lastRequest.method).toBe(method)
		expect(lastRequest.json()).toEqual(body);
	}

	it('Check create element', ()=>{
		var value=new MockModel();
		value.pk = ""+Math.random();
		subject.createElement(value);
		checkRequest(RequestMethod.Post, {pk:value.pk})
	})
});
