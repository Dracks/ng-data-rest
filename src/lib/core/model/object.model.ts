
/// TODO: Add a parameter to specify the pk name, and type
export default abstract class ObjectModel {
	abstract getPkKey():string
}
class ObjectModelWithStringPk extends ObjectModel{
	getPkKey(): string {
		return 'pk';
	}
}
export{ ObjectModelWithStringPk}
