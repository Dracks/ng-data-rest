import { Eater } from "lib/utils/buffer";
import { FactoryBase } from "./factory-base";
import ObjectModel from "lib/core/model/object.model";
import { EndpointModel } from "lib/core/endpoint.model";
import ConstructorBase from "lib/core/model/constructor-base.interface";
import Adapter from "lib/core/adapters/adapter.model";
export declare var registerHash: {};
export declare class RestManagerService implements Eater<EndpointModel<any>> {
    private _adapter;
    registered: {};
    readonly adapter: Adapter;
    constructor(_adapter: Adapter);
    newValue(endpoint: EndpointModel<any>): void;
    retrieve<T extends ObjectModel>(TCreator: ConstructorBase<T>): FactoryBase<T>;
}
