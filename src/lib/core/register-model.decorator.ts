import { registerHash } from './core.service'
import { FactoryBase } from "./factory-base";
import {Buffer} from '../utils/buffer';

export const DEFAULT_QUEUE = 'default'

export function RegisterRest(queue: string = DEFAULT_QUEUE) {
	var buffer: Buffer<any> = registerHash[queue];
	if (!buffer){
		buffer = registerHash[queue] = new Buffer<any>();
	}
	return function <T extends { new (): {} }>(TCreator: T) {
		buffer.add(TCreator);
		return TCreator
	}
}
