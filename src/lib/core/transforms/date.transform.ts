import * as moment from 'moment';

import TransformInterface from 'lib/core/transforms/transform.interface';
import { RestManagerService } from 'lib/core/rest-manager.service';

export default
function DateTransform(format: string){
	class d implements TransformInterface{
		constructor(core: RestManagerService){}
		serialize(value: any):any {
			return moment(value).format(format);
		}
		unserialize(value: any):any {
			return moment(value, format, true).toDate();
		}
	}
	return d;
}
