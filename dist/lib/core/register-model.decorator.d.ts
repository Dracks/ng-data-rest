import ObjectModel from "lib/core/model/object.model";
import ConstructorBase from "lib/core/model/constructor-base.interface";
export declare const DEFAULT_QUEUE = "default";
export declare function RegisterRest(data: {
    queue?: string;
    endpoint?: string;
    namespace?: string;
}): <T extends ObjectModel>(TCreator: ConstructorBase<T>) => ConstructorBase<T>;
