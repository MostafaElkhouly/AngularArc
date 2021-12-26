import { BaseModel } from "../model/base.model";


export abstract class BaseComponent<TModel extends BaseModel> {

  lang: string;


  constructor()
  {

  }

  isNan(item: string | number): boolean {
    return item === null || item === undefined || item.toString() === '' ;
  }

  isArrayEmpty(item: any[], minLength?: number): boolean {

    if(Array.isArray(item)) {
      if(!this.isNan(minLength))
        return item.length < minLength;
      return item.length === 0;
    }
    return true;
  }

  clearDuplicateFromArray<T>(item: T[]): T[] {

    return [...new Map(item.
      map(item => [JSON.stringify(item), item])).
      values()];
  }



}
