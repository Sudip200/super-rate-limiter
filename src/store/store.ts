import { storeType } from "../types/storeType";
import { KeyType } from "../types/keyType";
import IStore from "./storeInterface";
import InMemoryStore from "./inMemoryStore";
import RedisStore from "./redisStore";

class Store<T> implements IStore<T> {
    private store: IStore<T>;

    constructor(storeType: storeType) {
        if (storeType === "in-memory") {
            this.store = new InMemoryStore<T>();
        } else if (storeType === "redis") {
            this.store = new RedisStore<T>();
        } else {
            throw new Error("Invalid store type given");
        }
    }

    async getData(key: KeyType): Promise<T | null> {
        return this.store.getData(key);
    }

    async setData(key: KeyType, value: T): Promise<void> {
        return this.store.setData(key, value);
    }

    async deleteData(key: KeyType): Promise<void> {
        return this.store.deleteData(key);
    }

    async clearAll(): Promise<void> {
        return this.store.clearAll();
    }

    async hasKey(key: KeyType): Promise<boolean> {
        return this.store.hasKey(key);
    }
}

export default Store;
