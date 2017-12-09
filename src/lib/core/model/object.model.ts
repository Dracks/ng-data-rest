
/// TODO: Add a parameter to specify the pk name, and type
export default abstract class ObjectModel<T> {
	abstract getPk():T
}
class ObjectModelWithStringPk extends ObjectModel<string>{
	pk: string

	getPk(): string {
		return this.pk;
	}
}
export{ ObjectModelWithStringPk}
