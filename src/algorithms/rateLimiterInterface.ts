import Store from "../store/store";
import IStore from "../store/storeInterface";
import { KeyType } from "../types/keyType";
import { storeType } from "../types/storeType";
abstract class IRateLimiter<T>{
    protected store:IStore<T>;
    constructor(storeType:storeType){
        this.store= new Store<T>(storeType);
    }
    public abstract allowAccess(key:KeyType):Promise<boolean>
}
export default IRateLimiter
