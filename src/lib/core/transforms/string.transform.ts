import TransformInterface from "lib/core/transforms/transform.interface";
import { RestManagerService } from "lib/core/rest-manager.service";

export default class StringTransform implements TransformInterface{
	constructor(core: RestManagerService) {}
	serialize(value: any) {
		return value as string
	}
	unserialize(value: any) {
		return value
	}

}
