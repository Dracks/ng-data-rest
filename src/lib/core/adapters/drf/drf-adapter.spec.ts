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
import ObjectModel, { ObjectModelWithStringPk } from "lib/core/model/object.model";
import ListModel from "lib/core/model/list.model";
import JsonProperty from "lib/core/decorators/register-property";
import { FactoryBase } from "lib/core/factory-base";
import { mockObject } from "../../../../../libs/mocks/index";
import { RestManagerService } from "lib/core/rest-manager.service";
import { EndpointModel } from "lib/core/endpoint.model";
import DateTransform from "lib/core/transforms/date.transform";

class MockModel extends ObjectModelWithStringPk {
	@JsonProperty({})
	pk: string

	@JsonProperty({})
	name: string

	@JsonProperty({transform: DateTransform("YYYY-MM-DDZ"), key: 'last-update'})
	lastUpdate: Date;
}


describe('[DrfAdapter]', () => {
	var subject: DrfAdapter;
	var requestSpied: any;
	var lastRequest: Request;
	var backend: MockBackend;
	var listConnections: any[]
	var factory: FactoryBase<MockModel>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: XHRBackend, useClass: MockBackend },
				DrfAdapter
			]
		});

		subject = TestBed.get(DrfAdapter);
		backend = TestBed.get(XHRBackend);
		factory = new FactoryBase(mockObject(RestManagerService), new EndpointModel(MockModel))
		listConnections = [];

		backend.connections.subscribe((connection: any) => {
			lastRequest = connection.request;
			listConnections.push(connection);
		});
	});

	function checkRequest(url: string, method: RequestMethod, body: any=null) {
		expect(lastRequest).toBeTruthy();
		expect(lastRequest.url).toBe(url);
		expect(lastRequest.method).toBe(method)
		expect(lastRequest.json()).toEqual(body);
	}

	it('Check create element', () => {
		var value = factory.getInstance();
		const pk = "" + Math.random();
		value.name = "" + Math.random();
		subject.createElement(value).subscribe((e)=>{});;
		checkRequest('/mock/', RequestMethod.Post, { name: value.name })
		var lastConnection = listConnections[0];

		listConnections[0].mockRespond(new Response(
			new ResponseOptions({body: {pk: pk, name: value.name}})
		));
		expect(value.pk).toBe(pk);
	})

	it('Save element', ()=>{
		var value = factory.getInstance();
		const pk = "" + Math.random();
		const date = "2017-02-11Z";

		value.pk = pk
		value.name = "" + Math.random();
		subject.updateElement(value).subscribe((e)=>{});;
		checkRequest('/mock/'+pk, RequestMethod.Put, {pk: pk, name: value.name })
		var lastConnection = listConnections[0];

		listConnections[0].mockRespond(new Response(
			new ResponseOptions({body: {name: value.name, "last-update":date}})
		));
		expect(value.pk).toBe(pk);
		expect(value.lastUpdate.toISOString()).toBe(new Date(date).toISOString())
	});

	it('Retrieve an element', ()=>{
		var value = null;
		const pk = "" + Math.random();
		const name = "" + Math.random();
		subject.retrieveElement(factory, pk).subscribe((e)=>{
			value = e;
		});
		checkRequest('/mock/'+pk, RequestMethod.Get)
		listConnections[0].mockRespond(new Response(
			new ResponseOptions({body: {name: name}})
		));

		expect(value).toBeTruthy();
		expect(value.pk).toBe(pk);
		expect(value.name).toBe(name);
	});

	it('Retrieve a query of multiple elements', ()=>{
		var value = null;
		subject.retrieveListElements(factory, {query:"Dr Who"}).subscribe((e)=>{
			value = e
		})
		listConnections[0].mockRespond(new Response(
			new ResponseOptions({body: {results: []}})
		));
		checkRequest('/mock/?query=Dr%20Who', RequestMethod.Get)
		expect(value.data).toBeTruthy();
		expect(value.data.length).toBe(0);
	})
});
