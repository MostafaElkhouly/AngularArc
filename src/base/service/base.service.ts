import { MainResponse } from './../model/MainResponse.model';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { BaseModel } from "../model/base.model";
import { Observable } from 'rxjs';

export abstract class BaseService<T extends BaseModel>  {

  public readonly readonlyCountModel;

  constructor(private http: HttpClient,
    private dataStore: { data: T[] },
    private behaviorSubject: BehaviorSubject<T[]>) {
    this.readonlyCountModel = behaviorSubject.asObservable();
  }

  /**
   * @returns all Path with controller
   * @example http://hostname.com/api/controlName
   */
  abstract getUrl(): string;


  /**
   * @description in this method we will call http://hostname.com/api/controlName , Method Type is Get
   */
  GetAll(): void {
    this.http.get<MainResponse<T[]>>(this.getUrl())
      .subscribe((data: MainResponse<T[]>) => {
        if (data.code === 200) {
          this.dataStore.data = data.data;
          this.behaviorSubject.next(Object.assign({}, this.dataStore).data);
        }
      });
  }

  /**
   * @description in this method we will call http://hostname.com/api/controlName/{id} , Method Type is Get
   *
   */
  GetById(id: string): void {
    this.http.get<MainResponse<T>>(`${this.getUrl()}/${id}`)
      .subscribe((data: MainResponse<T>) => {
        if (data.code === 200) {
          // this.dataStore.data = data.data;

          let oldObject = this.dataStore.data.find(e => e.id == id);

          if (oldObject?.id !== null && oldObject?.id !== undefined) {
            const index = this.dataStore.data.indexOf(oldObject);
            this.dataStore.data[index] = data.data;
          } else {
            this.dataStore.data.push(data.data);
          }

          this.behaviorSubject.next(Object.assign({}, this.dataStore).data);
        }
      });
  }

  /**
   * @description in this method we will call http://hostname.com/api/controlName/{id} , Method Type is Put
   * @param t is body object
   * @param id is string id object
   */
  Update(body: T, id: string): void {
    this.http.put<MainResponse<string>>(`${this.getUrl()}/${id}`, body)
      .subscribe((data: MainResponse<string>) => {
        if (data.code === 200) {

          let oldObject = this.dataStore.data.find(e => e.id == id);
          if (oldObject?.id !== null && oldObject?.id !== undefined) {
            const index = this.dataStore.data.indexOf(oldObject);
            this.dataStore.data[index] = body;
          }


          this.behaviorSubject.next(Object.assign({}, this.dataStore).data);
        }
      });
  }

  /**
   * @description in this method we will call http://hostname.com/api/controlName/{id} , Method Type is Post
   * @param body is body object
   */
  Create(body: T): void {
    this.http.post<MainResponse<string>>(`${this.getUrl()}`, body)
      .subscribe((data: MainResponse<string>) => {
        if (data.code === 200) {
          body.id = data.data;
          this.dataStore.data.push(body);
          this.behaviorSubject.next(Object.assign({}, this.dataStore).data);
        }
      });
  }

}
