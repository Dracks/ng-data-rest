interface TransformInterface {
    /**
     * Convert from ORM object to API Value
     */
    serialize(value: any): any;
    /**
     *
     */
    unserialize(value: any): any;
}
export default TransformInterface;
