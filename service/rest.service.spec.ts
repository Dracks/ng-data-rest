import { TestBed, async, inject } from '@angular/core/testing';
import { Injector } from '@angular/core';

import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    RequestMethod,
    RequestOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import 'rxjs/operator/map'
import { Injectable } from '@angular/core';

import { RestService } from './rest.service';
import { RestBase, JsonProperty } from '../parent/rest.base';
import { ConfigBase } from '../parent/config.base';

class DemoClass extends RestBase {
    @JsonProperty({})
    name: string;

}

@Injectable()
class DemoConfig extends ConfigBase {
    getEndpoint(cName: string, id?: string): string {
        return '/api/' + cName + (id!==undefined ? '/'+id: '')
    }

    getAuth(ro: RequestOptions): Observable<RequestOptions> {
        return Observable.create(function (d){
           // console.log(d);
            d.next(ro);
            d.complete();
        })
    }
}


describe('Service with Http injected', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: XHRBackend, useClass: MockBackend },
                { provide: ConfigBase, useClass: DemoConfig },
                RestService
            ]
        });
    });

    beforeEach(inject([Http, XHRBackend, RestService], (http, mockBackend, restService) => {
        this.restService = restService;
        this.http = http;
        this.backend = mockBackend as MockBackend;
        this.lastConnection = null;
        this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
        this.backend.connections.subscribe((connection: any) => {
            if (this.response){
                connection.mockRespond(this.response)
            }
        });
        this.restService.register(DemoClass);
    }));

    it ('Call non-existing model', () => {
        class Demo2Class extends RestBase{};
        try {
            this.restService.retrieve(Demo2Class, 3)
            expect(false).toBe(true);
        } catch (error) {
            let e = error as Error;
            expect(e.message).toBe('Model Demo2Class is not registered');
        }
    });

    it('Register class correctly', () => {
        var r = this.restService.create(DemoClass);
        expect(r).not.toBeNull();
        expect(r.constructor.name).toBe(DemoClass.name);
    });

    it('Query', () => {
        this.restService.query(DemoClass, null).subscribe(() => { });
        expect(this.lastConnection).toBeDefined('no http service connection at all?');
        expect(this.lastConnection.request.url).toBe('/api/DemoClass', 'url invalid');
        expect(this.lastConnection.request.method).toBe(RequestMethod.Get);
    });

    it('Create new', () => {
        this.restService.create(DemoClass).save().subscribe();
        expect(this.lastConnection.request.url).toBe('/api/DemoClass', 'url invalid');
        expect(this.lastConnection.request.method).toBe(RequestMethod.Post);
    });

    it('Save existing', () => {
        var subject = this.restService.create(DemoClass);
        subject.id = 3;
        subject.save().subscribe();

        expect(this.lastConnection.request.url).toBe('/api/DemoClass/3', 'url invalid');
        expect(this.lastConnection.request.method).toBe(RequestMethod.Put);
    });

    it('Delete existing', ()=>{
        var subject = this.restService.create(DemoClass);
        subject.id = 8;
        subject.destroy().subscribe();

        expect(this.lastConnection.request.url).toBe('/api/DemoClass/8', 'url invalid');
        expect(this.lastConnection.request.method).toBe(RequestMethod.Delete);
    })

    it('http', () => {
        var result: DemoClass;

        var json = JSON.stringify({ id: '5', name: 'Dalek' })
        this.response = new Response(new ResponseOptions({
            body: json
        }));
        this.restService.retrieve(DemoClass, 5).subscribe(e => result=e);
        expect(this.lastConnection.request.url).toBe('/api/DemoClass/5', 'url invalid');
        expect(this.lastConnection.request.method).toBe(RequestMethod.Get);

        expect(result.name).toBe('Dalek');
    });

});
