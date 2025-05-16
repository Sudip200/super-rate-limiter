import { KeyType } from "../types/keyType";
import IStore from "./storeInterface";

class InMemoryStore implements IStore {
    protected store: Map<KeyType, any>;

    constructor() {
        this.store = new Map<KeyType, any>();
    }

    async getData(key: KeyType): Promise<any> {
        return this.store.get(key);
    }

    async setData(key: KeyType, value: any): Promise<any> {
        this.store.set(key, value);
    }

    async deleteData(key: KeyType): Promise<any> {
        this.store.delete(key);
    }

    async clearAll(): Promise<any> {
        this.store.clear();
    }

    async hasKey(key: KeyType): Promise<any> {
        return this.store.has(key);
    }
}

export default InMemoryStore;
