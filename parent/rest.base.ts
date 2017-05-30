import { Headers, RequestOptions, RequestMethod, Http, Response } from '@angular/http';
import { ResponseList } from "./response-list.base";
import { Observable } from 'rxjs/Rx';

import { ConfigBase } from "./config.base";
import { RestService } from '../service/rest.service';
import { Plain } from '../transforms/plain';

export function JsonProperty(data: any) {
    return function d(target, propertyKey){
        var json = target.constructor.prototype.__json
        if (json === undefined){
            json = target.constructor.prototype.__json = [];
        }
        if (data.key === undefined){
            data.key = propertyKey
        }
        if (data.transform === undefined ){
            data.transform = new Plain();
        }
        data.property = propertyKey;
        json.push(data);
    };
}
export class RestBase {
    private __json: any;
    @JsonProperty({})
    id: string;
    constructor(private http: Http,
        private config: ConfigBase,
        private service: RestService) {

    }
    toJson(){
        var data: any = {};
        var jsonProperties = this.__json
        for (var i in jsonProperties){
            var e = jsonProperties[i];
            if (this[e.property]!== undefined){
                data[e.key] = e.transform.unserialize(this[e.property]);
            }
        }
        return data;
    }
    fromJson(data: any) {
        var jsonProperties = this.__json
        for (var i in jsonProperties){
            var e = jsonProperties[i]
            if (data[e.key] !== undefined){
                this[e.property] = e.transform.serialize(data[e.key]);
            }
        }
        return this;
    }
    reload(): Promise<this>{
        var endpoint = this.config.getEndpoint(this.constructor.name, this.id);
        var options = new RequestOptions({
            headers: new Headers(),
            url: endpoint
        });
        return this.config.catch(this.config.getAuth(options, this.constructor.name).then((auth_opts)=>{
            return this.http.get(endpoint, auth_opts).map(r=> this.fromJson(r.json())).toPromise();
        }))
    }

    save(): Promise<this> {
        var endpoint = this.config.getEndpoint(this.constructor.name, this.id);
        var options = new RequestOptions({
            headers: new Headers(),
            url: endpoint,
        });
        return this.config.getAuth(options, this.constructor.name).then((auth_opts) => {
            var response;
            var jsonData = this.toJson();
            if (this.id == undefined) {
                response = this.http.post(endpoint, jsonData, auth_opts);
            } else {
                response = this.http.put(endpoint, jsonData, auth_opts);
            }
            var data = response.map(r=> this.fromJson(r.json())).toPromise();
            return this.config.catch(data) as Promise<this>
        });
    }

    destroy(): Promise<boolean> {
        var endpoint = this.config.getEndpoint(this.constructor.name, this.id);
        var options = new RequestOptions({
            headers: new Headers(),
        });
        return this.config.getAuth(options, endpoint).then(authOpts => {
            return this.config.catch(this.http.delete(endpoint, authOpts).map(r => {
                return true;
            }).toPromise())
        });
    }
}
