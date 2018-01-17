import ObjectModel from "lib/core/model/object.model";
import { FactoryBase } from "lib/core/factory-base";
export default abstract class ListModel<T extends ObjectModel> {
    protected _factory: FactoryBase<T>;
    protected _data: T[];
    protected _meta: any;
    readonly data: T[];
    constructor(_factory: FactoryBase<T>);
    abstract loadFromJson(obj: any): any;
}
