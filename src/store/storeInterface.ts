import { KeyType } from "../types/keyType";
interface IStore<T>{
    getData(key:KeyType):Promise<T | null>;
    setData(key:KeyType,value:T):Promise<void>;
    deleteData(key:KeyType):Promise<void>;
    clearAll():Promise<void>;
    hasKey(key:KeyType):Promise<boolean>;
}
export default IStore;