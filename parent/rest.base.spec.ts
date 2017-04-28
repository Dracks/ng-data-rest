import { inject } from '@angular/core/testing';

import { RestBase, JsonProperty } from './rest.base';
import { RestService } from '../service/rest.service';

/*
function register(){
    return function r<T extends {new(...args:any[]):{}}>(constructor:T) {
        return constructor;
    }
}

@register()
class Rest extends RestBase{
    something: String
}*/


class R1 extends RestBase{
    @JsonProperty({})
    hola: String
}

describe('Decorators', () => {
    var httpMock, configMock, serviceMock
    beforeEach(()=>{
        httpMock = jasmine.createSpyObj('Http', ['get']);
        configMock = jasmine.createSpyObj('ConfigBase', ['getEndpoint']);
        serviceMock = jasmine.createSpyObj('RestService', ['retrieve']);
    })
    it('Converting correctly', () => {
        var subject = new R1(httpMock, configMock, serviceMock);

        subject.fromJson({'id':6, 'hola': 'mon!'});
        expect(subject.hola).toBe('mon!')
        expect(subject.id).toBe(6)
    });
});
