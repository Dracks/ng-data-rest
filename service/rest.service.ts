import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { FactoryBase } from "./rest.factory";
import { RestBase } from "../parent/rest.base";
import { ConfigBase } from "../parent/config.base";
import { ResponseList } from "../parent/response-list.base";
import { Headers, RequestOptions, Http, Response } from '@angular/http';


@Injectable()
export class RestService{
    registered: {[name:string]:FactoryBase<any>}={}

    constructor(private http: Http, protected config: ConfigBase){}

    register<T extends RestBase>(TCreator: { new (Http, IConfig, RestService): T; }){
        this.registered[TCreator.name] = new FactoryBase(this.http, this.config, this, TCreator);
    }

    private retrieveFactory<T extends RestBase>(TCreator: { new (Http, IConfig, RestService): T; }){
        var factory =  this.registered[TCreator.name];
        if (factory == undefined){
            throw new Error("Model "+TCreator.name+" is not registered");
        }
        return factory;
    }

    retrieve<T extends RestBase>(TCreator: { new (Http, IConfig, RestService): T; }, id: string): Observable<T>{
        return this.retrieveFactory(TCreator).retrieve(id);
    }

    query<T extends RestBase>(TCreator: { new (Http, IConfig, RestService): T; }, params: any): Observable<ResponseList<T>>{
        var factory=this.retrieveFactory(TCreator);
        return factory.query(params);
    }

    create<T extends RestBase>(TCreator: { new (Http, IConfig, RestService): T; }, data?: any): T{
        var value = this.retrieveFactory(TCreator).create();
        if (data){
            value.fromJson(data);
        }
        return value;
    }
}
