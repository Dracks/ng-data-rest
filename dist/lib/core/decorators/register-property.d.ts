import TransformCreatorInterface from "lib/core/transforms/transform-creator.interface";
import TransformInterface from 'lib/core/transforms/transform.interface';
declare class RegisteredPropertyType {
    key: string;
    transform: TransformCreatorInterface<TransformInterface>;
    property: string;
}
export default function JsonProperty(oldData: {
    key?: string;
    transform?: TransformCreatorInterface<any>;
}): (target: any, propertyKey: any) => void;
export { RegisteredPropertyType };
