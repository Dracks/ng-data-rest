import { Headers, RequestOptions, RequestMethod, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { RestService } from "./rest.service";
import { ResponseList } from "../parent/response-list.base";
import { RestBase } from "../parent/rest.base";
import { ConfigBase } from "../parent/config.base";

export class FactoryBase<T extends RestBase>{

    constructor(
        private http: Http,
        private config: ConfigBase,
        private service: RestService,
        private TCreator: { new (Http, IConfig, RestService): T; }) {
    }

    create(): T {
        return new this.TCreator(this.http, this.config, this.service);
    }

    query(params: any): Observable<ResponseList<T>> {
        var options = new RequestOptions({
            headers: new Headers(),
        });
        return this.config.getAuth(options, this.constructor.name).flatMap((auth_opts) => {
            var data = this.http.get(this.config.getEndpoint(this.TCreator.name), auth_opts)
            return data.map(r => {
                var list = new ResponseList<T>(this.http, this.config, this.service, this.TCreator);
                return list.fromJson(r.json());
            });
        });
    }

    retrieve(id: string): Observable<T> {
        var options = new RequestOptions({
            headers: new Headers(),
        });
        return this.config.getAuth(options, this.constructor.name).flatMap((auth_opts) => {
            var data = this.http.get(this.config.getEndpoint(this.TCreator.name) + "/" + id, auth_opts);
            return data.map(r => {
                var newInstance = this.create() as RestBase;
                return newInstance.fromJson(r.json()) as any;
            });
        })
    }
}
