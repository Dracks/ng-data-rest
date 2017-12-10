
import StringTransform from "lib/core/transforms/string.transform";
import { StringUtils } from "lib/utils/string";
import TransformCreatorInterface from "lib/core/transforms/transform-creator.interface";
import TransformInterface from 'lib/core/transforms/transform.interface';

class RegisteredPropertyType {
	key: string
	transform: TransformCreatorInterface<TransformInterface>
	property: string
}

export default function JsonProperty(oldData: {key?: string, transform?: TransformCreatorInterface<any>}) {
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
            data.transform = StringTransform;
        }
        data.property = propertyKey;
        json.push(data);
    };
}

export {RegisteredPropertyType};
