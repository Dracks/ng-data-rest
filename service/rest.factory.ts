import { Headers, RequestOptions, RequestMethod, Http, Response, URLSearchParams } from '@angular/http';
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

    query(params: any): Promise<ResponseList<T>> {
        var urlParams = new URLSearchParams();
        for (var k in params){
            urlParams.append(k, params[k]);
        }
        var options = new RequestOptions({
            headers: new Headers(),
            params: urlParams
        });
        return this.config.getAuth(options, this.constructor.name).then((auth_opts) => {
            var data = this.http.get(this.config.getEndpoint(this.TCreator.name), auth_opts)
                .map(r => {
                    var list = new ResponseList<T>(this.http, this.config, this.service, this.TCreator);
                    return list.fromJson(r.json());
                }).toPromise();

            return this.config.catch(data);
        });
    }

    retrieve(id: string): Promise<T> {
        var options = new RequestOptions({
            headers: new Headers(),
        });
        return this.config.getAuth(options, this.constructor.name).then((auth_opts) => {
            var data = this.http.get(this.config.getEndpoint(this.TCreator.name) + "/" + id, auth_opts).map(r => {
                var newInstance = this.create() as RestBase;
                return newInstance.fromJson(r.json()) as any;
            }).toPromise() as Promise<T>;
            return this.config.catch(data);
        })
    }
}
