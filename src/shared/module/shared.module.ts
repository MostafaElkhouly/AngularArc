import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * @class this module is used to shared any service or component in all project
 * @example if you want use a upload component in all project you must add uploadComponent in imports part to shared in all project
 */

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
