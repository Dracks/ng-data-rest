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

import HttpAdapter from "lib/core/adapters/http/http.abstract";
import ObjectModel from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";


@Injectable()
class HttpAdapterMock extends HttpAdapter {
	constructor(http: Http) {
		super(http);
	}

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

	/**
	 * publicRequest
	 */
	public publicRequest(req: Request) {
		return this.request(req)
	}

}

describe('Requests', () => {

	var subject: HttpAdapterMock;
	var backend: MockBackend;
	var listConnections: any[]

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: XHRBackend, useClass: MockBackend },
				HttpAdapterMock
			]
		});

		subject = TestBed.get(HttpAdapterMock);
		backend = TestBed.get(XHRBackend);
		listConnections = [];

		backend.connections.subscribe((connection: any) => {
			listConnections.push(connection);
		});
	});

	it('Call Get on single', () => {
		var req = new Request(new RequestOptions({
			method: 'GET',
		}));

		var randValue = Math.random();
		var r = new Response(new ResponseOptions({
			body: { "value": randValue }
		}));
		var responseValue = null;

		subject.publicRequest(req).subscribe(e => {
			responseValue = e.json().value;
			//e.text().then(e=>{ console.log(e); responseValue = e });
		});

		expect(listConnections.length).toBe(1);
		var connection = listConnections[0];
		expect(connection.request.method).toBe(RequestMethod.Get)
		connection.mockRespond(r);

		expect(responseValue).toBe(randValue);
	});
});

