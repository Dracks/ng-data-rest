import {Buffer} from '../utils/buffer';

import { registerHash } from './rest-manager.service'
import { FactoryBase } from "./factory-base";
import { EndpointModel } from "lib/core/endpoint.model";
import ObjectModel from "lib/core/model/object.model";
import ConstructorBase from "lib/core/model/constructor-base.interface";

export const DEFAULT_QUEUE = 'default'

export function RegisterRest(data: {queue?: string, endpoint?: string, namespace?: string}) {
	if (!data.queue){
		data.queue = DEFAULT_QUEUE;
	}
	var buffer: Buffer<EndpointModel<any>> = registerHash[data.queue];
	if (!buffer){
		buffer = registerHash[data.queue] = new Buffer<EndpointModel<any>>();
	}
	return function <T extends ObjectModel>(TCreator: ConstructorBase<T>) {
		var endpoint = new EndpointModel(TCreator);
		endpoint.namespace = data.namespace;
		endpoint.endpoint = data.endpoint;
		buffer.add(endpoint);
		return TCreator
	}
}
