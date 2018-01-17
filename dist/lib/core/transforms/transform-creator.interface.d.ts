import { RestManagerService } from "lib/core/rest-manager.service";
interface TransformCreatorInterface<T> {
    new (core: RestManagerService): T;
}
export default TransformCreatorInterface;
