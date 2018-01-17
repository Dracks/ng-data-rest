import ObjectModel from "lib/core/model/object.model";
import { FactoryBase } from "lib/core/factory-base";
interface ConstructorBase<T extends ObjectModel> {
    new (factory: FactoryBase<T>): T;
}
export default ConstructorBase;
