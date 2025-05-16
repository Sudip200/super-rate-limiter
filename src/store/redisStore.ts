import { KeyType } from "../types/keyType";
import IStore from "./storeInterface";

class RedisStore implements IStore{
    getData(key: KeyType): Promise<any> {
        throw new Error("Method not implemented.");
    }
    setData(key: KeyType, value: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteData(key: KeyType): Promise<any> {
        throw new Error("Method not implemented.");
    }
    clearAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    hasKey(key: KeyType): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}
export default RedisStore;