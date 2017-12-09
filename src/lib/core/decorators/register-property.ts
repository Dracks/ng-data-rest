import TransformInterface from "lib/core/transforms/transform.interface";
import StringTransform from "lib/core/transforms/string.transform";

class RegisteredPropertyType {
	key: string
	transform: TransformInterface
	property: string
}

export default function JsonProperty(oldData: {key?: string, transform?: TransformInterface}) {
	var data = oldData as RegisteredPropertyType;
    return function d(target, propertyKey){
        var json = target.constructor.prototype.__json
        if (json === undefined){
            json = target.constructor.prototype.__json = [];
        }
        if (data.key === undefined){
            data.key = propertyKey
        }
        if (data.transform === undefined ){
            data.transform = new StringTransform();
        }
        data.property = propertyKey;
        json.push(data);
    };
}

export {RegisteredPropertyType};
