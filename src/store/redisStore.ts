import { KeyType } from "../types/keyType";
import IStore from "./storeInterface";

class RedisStore<T> implements IStore<T>{
    getData(key: KeyType): Promise<T> {
        throw new Error("Method not implemented.");
    }
    setData(key: KeyType, value: T): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteData(key: KeyType): Promise<void> {
        throw new Error("Method not implemented.");
    }
    clearAll(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    hasKey(key: KeyType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}
export default RedisStore;