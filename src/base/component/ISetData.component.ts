import { BaseModel } from './../model/base.model';
export interface ISetData<TModel extends BaseModel> {
  /**
   *from Api to form
   * @param model
   */
   setDataToForm(model: TModel): void;
}
