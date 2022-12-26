import { Categories } from './../models/categories';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  public catSelected:number;

  constructor(private http: HttpClient) { }
  public endPointApi = 'https://localhost:44318/api/Categories/';

  async getSingleItem(id: number): Promise<Categories>{
    return this.http.get(this.endPointApi + id).toPromise<any>();
  }

  async getAll(): Promise<Array<Categories>>{
    return this.http.get(this.endPointApi ).toPromise<any>();
  }

  async addItem(post: any): Promise<Categories>{
    debugger;
    return  await this.http.post(this.endPointApi , post).toPromise<any>();
  }
  async PostCategory2(formData:FormData){
    debugger
    return await this.http.post(this.endPointApi,formData).pipe();
  }

 async deleteItem(id: number): Promise<Categories>{
    return this.http.delete(this.endPointApi  + id).toPromise<any>();
  }
  async deleteWithSwitchCategory(Old: number,toSwitch:number): Promise<Categories>{

    return this.http.delete(this.endPointApi  + "deleteWithOutProducts/"+Old+'/'+toSwitch).toPromise<any>();
  }

  async PutCategory2(formData:FormData){
    debugger
    return await this.http.put(this.endPointApi,formData).pipe();
  }

  async updateItem(post: any, id: number): Promise<Categories>{
    return this.http.put(this.endPointApi  + id, post).toPromise<any>();
  }
}
