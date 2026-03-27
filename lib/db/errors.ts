export class ItemInUseError extends Error {
    constructor(message = "Item is still used somewhere else") {
        super(message);
        this.name = "ItemInUseError";
    }
}