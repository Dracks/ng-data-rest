import TransformInterface from 'lib/core/transforms/transform.interface';
export default class ParseInfo {
    key: string;
    private obj;
    private property;
    private transform;
    constructor(key: string, obj: any, property: string, transform: TransformInterface);
    serialize(): any;
    unserialize(data: string): void;
}
