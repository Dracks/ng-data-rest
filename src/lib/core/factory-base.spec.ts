import { FactoryBase } from "lib/core/factory-base";
import { SampleEmptyObjectModel } from "lib/core/test-mocks/object.model";
import { RestManagerService } from "lib/core/rest-manager.service";
import { mockObject } from "../../../libs/mocks/mock";
import { EndpointModel } from "lib/core/endpoint.model";



describe('[Factory-Base]', ()=>{
	var subject: FactoryBase<SampleEmptyObjectModel>;
	var restManagerMock: RestManagerService;
	var endpoint: EndpointModel<SampleEmptyObjectModel>;


	beforeEach(()=>{
		restManagerMock = mockObject(RestManagerService);
		endpoint = new EndpointModel(SampleEmptyObjectModel);
		subject = new FactoryBase(restManagerMock, endpoint);
	});

	it('Exists!', ()=>{
		expect(subject).toBeTruthy();
	})

	it('Create Object Model', ()=>{
		var obj=subject.getInstance();
		expect(obj).toBeTruthy();
		expect(obj instanceof SampleEmptyObjectModel).toBe(true);
	})
})
