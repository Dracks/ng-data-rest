import { RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';

import { RestBase } from "./rest.base";
import { StringUtils } from '../utils/string-utils';


class ConfigBase{
    getEndpoint(cName: string, id?: string): string{
        if (cName.substr(-5, 5) == "Model"){
            cName = cName.substr(0, cName.length-5);
        }
        var endpoint =  '/'+StringUtils.snakize(cName);
        if (id!==undefined){
            endpoint += '/' + id;
        }
        return endpoint;
    }

    getAuth(ro: RequestOptions, cName: string): Observable<RequestOptions> {
        throw Error('Method not implemented');
    }
}

export {ConfigBase}
