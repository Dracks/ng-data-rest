import { TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
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

    getAuth(ro: RequestOptions): Promise<RequestOptions> {
        return Observable.create(function (d){
           // console.log(d);
            d.next(ro);
            d.complete();
        }).toPromise()
    }
}


describe('[Rest Service]', () => {

    var subject : RestService,
        lastConnection: any,
        http: any,
        backend: MockBackend,
        response: any

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

    beforeEach(inject([Http, XHRBackend, RestService], (_http, mockBackend, restService) => {
        subject = restService;
        http = _http;
        backend = mockBackend as MockBackend;
        lastConnection = null;
        response = null;
        backend.connections.subscribe((connection: any) => {
            lastConnection = connection
            if (response){
                connection.mockRespond(response)
            }
        });
        restService.register(DemoClass);
    }));

    it ('Call non-existing model', () => {
        class Demo2Class extends RestBase{};
        try {
            subject.retrieve(Demo2Class, "" + 3)
            expect(false).toBe(true);
        } catch (error) {
            let e = error as Error;
            expect(e.message).toBe('Model Demo2Class is not registered');
        }
    });

    it('Register class correctly', () => {
        var r = subject.create(DemoClass);
        expect(r).not.toBeNull();
        expect(r.constructor.name).toBe(DemoClass.name);
    });

    it('Query', fakeAsync(() => {
        subject.query(DemoClass, null).then(() => { });
        tick();
        expect(lastConnection).toBeDefined('no http service connection at all?');
        expect(lastConnection.request.url).toBe('/api/DemoClass', 'url invalid');
        expect(lastConnection.request.method).toBe(RequestMethod.Get);
    }));

    it('Create new', fakeAsync(() => {
        subject.create(DemoClass).save();
        tick();
        expect(lastConnection.request.url).toBe('/api/DemoClass', 'url invalid');
        expect(lastConnection.request.method).toBe(RequestMethod.Post);
    }));

    it('Save existing', fakeAsync(() => {
        var subjectModel = subject.create(DemoClass) as any;
        subjectModel.id = 3;
        subjectModel.save().then();
        tick();
        expect(lastConnection.request.url).toBe('/api/DemoClass/3', 'url invalid');
        expect(lastConnection.request.method).toBe(RequestMethod.Put);
    }));

    it('Delete existing', fakeAsync(()=>{
        var subjectModel = subject.create(DemoClass) as any;
        subjectModel.id = 8;
        subjectModel.destroy();
        tick();
        expect(lastConnection.request.url).toBe('/api/DemoClass/8', 'url invalid');
        expect(lastConnection.request.method).toBe(RequestMethod.Delete);
    }));

    it('http', fakeAsync(() => {
        var result: DemoClass;

        var json = JSON.stringify({ id: '5', name: 'Dalek' })
        response = new Response(new ResponseOptions({
            body: json
        }));
        subject.retrieve(DemoClass, "" + 5).then(e => result=e);
        tick();
        expect(lastConnection.request.url).toBe('/api/DemoClass/5', 'url invalid');
        expect(lastConnection.request.method).toBe(RequestMethod.Get);

        expect(result.name).toBe('Dalek');
    }));

});
