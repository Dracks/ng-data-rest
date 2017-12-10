import TransformInterface from 'lib/core/transforms/transform.interface';

export default
class ParseInfo{
	constructor(public key: string,
		private obj: any,
		private property: string,
		private transform: TransformInterface){}
	serialize(){
		const data = this.obj[this.property];
		if (data){
			return this.transform.serialize(this.obj[this.property]);
		} else {
			return null;
		}
	}
	unserialize(data: string){
		this.obj[this.property]=this.transform.unserialize(data);
	}
}
