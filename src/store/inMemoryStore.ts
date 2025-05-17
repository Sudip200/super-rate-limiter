import { KeyType } from "../types/keyType";
import IStore from "./storeInterface";

class InMemoryStore<T> implements IStore<T> {
    protected store: Map<KeyType, T>;

    constructor() {
        this.store = new Map<KeyType, T>();
    }

    async getData(key: KeyType): Promise<any> {
        return this.store.get(key);
    }

    async setData(key: KeyType, value:T): Promise<void> {
        this.store.set(key, value);
    }

    async deleteData(key: KeyType): Promise<void> {
        this.store.delete(key);
    }

    async clearAll(): Promise<void> {
        this.store.clear();
    }

    async hasKey(key: KeyType): Promise<boolean> {
        return this.store.has(key);
    }
}

export default InMemoryStore;
