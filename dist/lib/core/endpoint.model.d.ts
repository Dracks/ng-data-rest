import ObjectModel from "lib/core/model/object.model";
import ConstructorBase from "lib/core/model/constructor-base.interface";
export declare class EndpointModel<T extends ObjectModel> {
    creator: ConstructorBase<T>;
    endpoint: string;
    namespace: string;
    name: string;
    constructor(creator: ConstructorBase<T>);
}
