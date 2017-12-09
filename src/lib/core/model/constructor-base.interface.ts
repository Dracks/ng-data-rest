
import ObjectModel from "lib/core/model/object.model";

interface ConstructorBase<T extends ObjectModel> {
	new (): T
};

export default  ConstructorBase;
