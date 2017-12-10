import { RegisterRest } from '../register-model.decorator';
import ObjectModel, { ObjectModelWithStringPk } from '../model/object.model';

@RegisterRest({})
export class SampleEmptyObjectModel extends ObjectModelWithStringPk{

}

export default SampleEmptyObjectModel;
