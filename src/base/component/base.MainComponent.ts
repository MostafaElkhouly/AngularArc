import { BaseModel } from "../model/base.model";
import { BaseComponent } from "./base.component";

export abstract class BaseFormComponent<TModel extends BaseModel> extends BaseComponent<TModel> {

  constructor()
  {
    super();
    this.initForm();
  }

  /**
   *
   */
  abstract initForm(): void;

  /**
   *
   */
  abstract loadData(): void;

  /**
   *
   * @param model
   */
  abstract setData(model: TModel): void;

  /**
   *
   */
  abstract getData(): TModel;

  /**
   *
   */
  abstract save(): void;

}
