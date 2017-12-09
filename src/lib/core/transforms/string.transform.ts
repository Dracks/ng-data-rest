import TransformInterface from "lib/core/transforms/transform.interface";

export default class StringTransform implements TransformInterface{
	serialize(value: any) {
		return value as string
	}
	unserialize(value: any) {
		return value
	}

}
