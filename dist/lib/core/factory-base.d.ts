import ObjectModel from "./model/object.model";
import { RestManagerService } from "lib/core/rest-manager.service";
import { EndpointModel } from "lib/core/endpoint.model";
import Adapter from "lib/core/adapters/adapter.model";
export declare class FactoryBase<T extends ObjectModel> {
    private core;
    private objectInfo;
    readonly endpoint: EndpointModel<T>;
    readonly service: RestManagerService;
    readonly adapter: Adapter;
    constructor(core: RestManagerService, objectInfo: EndpointModel<T>);
    getInstance(): T;
}
