export interface Eater<T> {
	newValue(v: T);
}

export class Buffer<T>{
	private list: T[];

	private _delegate: Eater<T>;
	set delegate(d: Eater<T>) {
		this._delegate = d;
		while (this.list.length) {
			d.newValue(this.list.shift());
		}
	}

	constructor() {
		this.list = [];
	}

	add(v: T) {
		if (this._delegate) {
			this._delegate.newValue(v);
		} else {
			this.list.push(v);
		}
	}

	size() {
		return this.list.length;
	}
}
