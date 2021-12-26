import { BaseModel } from "../model/base.model";

export interface IInit<TModel extends BaseModel> {

  initForm(): void;

  /**
   * from form
   */
  getDataFromForm(): TModel;

  checkFormValidation(): boolean;

  save(): void;
}
