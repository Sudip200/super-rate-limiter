import { KeyType } from "../types/keyType";
interface IStore{
    getData(key:KeyType):Promise<any>;
    setData(key:KeyType,value:any):Promise<any>;
    deleteData(key:KeyType):Promise<any>;
    clearAll():Promise<any>;
    hasKey(key:KeyType):Promise<any>;
}
export default IStore;