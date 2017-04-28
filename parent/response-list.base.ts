import { Http } from '@angular/http';
import { ConfigBase } from "./config.base";
import { RestBase } from "./rest.base";
import { RestService } from '../service/rest.service';

export class ResponseList<T extends RestBase> {
    results: T[];
    constructor(private http: Http,
        private config: ConfigBase,
        private service: RestService,
        private TCreator: { new (Http, IConfig, RestService): T; }) {

    }

    fromJson(data: any): ResponseList<T>{
        this.results = data.results.map(element => {
            var e = new this.TCreator(this.http, this.config, this.service);
            e.fromJson(element);
            return e;
        });
        return this;
    }
}
