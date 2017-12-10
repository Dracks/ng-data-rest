import * as moment from 'moment';

import TransformInterface from 'lib/core/transforms/transform.interface';

export default
class DateTransform implements TransformInterface{
	constructor(private format: string){}
	serialize(value: any):any {
		return moment(value).format(this.format);
	}
	unserialize(value: any):any {
		return moment(value, this.format, true).toDate();
	}

}
