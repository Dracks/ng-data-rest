import { FactoryBase } from "lib/core/factory-base";
import ParseInfo from "lib/core/model/parse-info.model";
import { Observable } from "rxjs/Observable";
export default abstract class ObjectModel {
    private _factory;
    private _cacheParser;
    isNew: boolean;
    readonly __factory: FactoryBase<any>;
    readonly __parsersData: Array<ParseInfo>;
    constructor(_factory: FactoryBase<any>);
    save(): Observable<ObjectModel>;
    abstract getPkKey(): string;
}
declare class ObjectModelWithStringPk extends ObjectModel {
    pk: string;
    getPkKey(): string;
}
export { ObjectModelWithStringPk };
