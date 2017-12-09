import DateTransform from "lib/core/transforms/date.transform";

describe ('DateTransform Spec', ()=>{
	var subject: DateTransform;

	beforeEach(()=>{
		subject = new DateTransform("YYYY-MM-DD hh:mm:ss");
	})

	it('Exists!', ()=>{
		expect(subject).toBeTruthy();
	})

	it('Convert from Date to Json', ()=>{
		const date = "2017-05-12 10:02:32";

		expect(subject.serialize(new Date(date))).toBe(date)
	});

	it('Convert from Json to Date', ()=>{
		const date = "2018-03-13 11:33:12";
		var ret = subject.unserialize(date) as Date;
		expect(ret instanceof Date).toBe(true);
		expect(ret.toISOString()).toBe(new Date(date).toISOString());
	});
})
