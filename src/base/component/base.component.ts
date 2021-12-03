import { BaseModel } from "../model/base.model";

export abstract class BaseComponent<T extends BaseModel> {

  constructor(){

  }

  isNan(item: string | number): boolean {
    return item === null || item === undefined || item.toString() === '' ;
  }

  isArrayEmpty(item: any[]): boolean {

    if(Array.isArray(item)) {
      return item.length === 0;
    }
    return true;
  }

}
