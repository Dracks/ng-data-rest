export interface Eater<T> {
    newValue(v: T): any;
}
export declare class Buffer<T> {
    private list;
    private _delegate;
    delegate: Eater<T>;
    constructor();
    add(v: T): void;
    size(): number;
}
