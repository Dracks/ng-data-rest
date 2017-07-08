
import { Buffer, Eater } from "./buffer";

class Delegate implements Eater<number> {
	newValue(v: number) {
		throw new Error("Method not implemented.");
	}
}

describe('[Queue]', () => {
	var subject: Buffer<number>;
	var d1= new Delegate();

	beforeEach(()=>{
		subject = new Buffer<number>();
	});

	it ('Add correctly to queue', ()=>{
		expect(subject.size()).toBe(0)
		subject.add(1);
		expect(subject.size()).toBe(1)
	});

	it ('Add a delegate empties the buffer', ()=>{
		subject.add(3);
		subject.add(5);
		subject.add(7);
		expect(subject.size()).toBe(3);
		spyOn(d1, 'newValue').and.callFake(()=>{});
		subject.delegate = d1;
		expect(d1.newValue).toHaveBeenCalledTimes(3);
		expect(d1.newValue).toHaveBeenCalledWith(3);
		expect(d1.newValue).toHaveBeenCalledWith(5);
		expect(d1.newValue).toHaveBeenCalledWith(7);
		expect(subject.size()).toBe(0);
	})

	it('When adding new values is calling', ()=>{
		spyOn(d1, 'newValue')
		subject.delegate = d1;
		subject.add(32);
		expect(d1.newValue).toHaveBeenCalledWith(32);
	})
});
