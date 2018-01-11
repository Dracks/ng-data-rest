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
import JsonProperty from "lib/core/decorators/register-property";
import { mockObject } from "../../../../../libs/mocks/mock";
import { FactoryBase } from "lib/core/factory-base";


@Injectable()
class HttpAdapterMock extends HttpAdapter {
	constructor(http: Http) {
		super(http);
	}

	createElement(e: ObjectModel): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	retrieveElement(factory: FactoryBase<ObjectModel>, id: any): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	retrieveListElements(factory: FactoryBase<ObjectModel>, options: any): Observable<ListModel<ObjectModel>> {
		throw new Error("Method not implemented.");
	}
	updateElement(e: ObjectModel): Observable<ObjectModel> {
		throw new Error("Method not implemented.");
	}
	deleteElement(e: ObjectModel): Observable<boolean> {
		throw new Error("Method not implemented.");
	}

	/**
	 * publicRequest
	 */
	public publicRequest(req: any) {
		return this.request(req)
	}
}

class MockObject extends ObjectModel{
	@JsonProperty({})
	value;

	getPkKey(): string {
		throw new Error("Method not implemented.");
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
		var req = {
			method: 'GET',
		};

		var randValue = Math.random();
		var r = new Response(new ResponseOptions({
			body: { "value": randValue }
		}));
		var responseValue = null;

		var objectInstance = new MockObject(mockObject(FactoryBase))

		subject.publicRequest(req).subscribe(e => {
			var instance = e.json()
			responseValue = instance.value;
			//e.text().then(e=>{ console.log(e); responseValue = e });
		});

		expect(listConnections.length).toBe(1);
		var connection = listConnections[0];
		expect(connection.request.method).toBe(RequestMethod.Get)
		connection.mockRespond(r);

		expect(responseValue).toBe(randValue);
	});
});

