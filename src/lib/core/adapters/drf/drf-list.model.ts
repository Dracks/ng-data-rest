import ListModel from "lib/core/model/list.model";
import { ObjectModel } from "lib/observables";
import DrfAdapter from "lib/core/adapters/drf/drf-adapter";


class DrfListModel<T extends ObjectModel> extends ListModel<T>{

	loadFromJson(obj: any) {
		var factory = this._factory;
		var adapter = factory.adapter as DrfAdapter
		obj.results.forEach(element => {
			var instance = factory.getInstance();
			adapter.assignData(instance, element);
			this._data.push(instance);
		});
	}

}

export default DrfListModel;
