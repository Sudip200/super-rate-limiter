import { storeType } from "../types/storeType";
import { KeyType } from "../types/keyType";
import IStore from "./storeInterface";
import InMemoryStore from "./inMemoryStore";
import RedisStore from "./redisStore";

class Store implements IStore {
    private store: IStore;

    constructor(storeType: storeType) {
        if (storeType === "in-memory") {
            this.store = new InMemoryStore();
        } else if (storeType === "redis") {
            this.store = new RedisStore();
        } else {
            throw new Error("Invalid store type given");
        }
    }

    async getData(key: KeyType): Promise<any> {
        return this.store.getData(key);
    }

    async setData(key: KeyType, value: any): Promise<any> {
        return this.store.setData(key, value);
    }

    async deleteData(key: KeyType): Promise<any> {
        return this.store.deleteData(key);
    }

    async clearAll(): Promise<any> {
        return this.store.clearAll();
    }

    async hasKey(key: KeyType): Promise<any> {
        return this.store.hasKey(key);
    }
}

export default Store;
