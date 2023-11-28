import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { UserDataType } from "./userModel.model";
import { Observable } from "rxjs";

@Injectable()


export class UserDataService{
  
    constructor(private http : HttpClient){}

    baseUrl = 'http://localhost:3000/userData'
   
    getData(): Observable<any>{
      return  this.http.get(this.baseUrl)
    }
  
    postData(obj:UserDataType ){
      return  this.http.post(this.baseUrl,obj)
    }
    updateUser(obj:UserDataType , id:number){
      return this.http.put(`${this.baseUrl}/${id}`,obj)
    }

    deleteUser(id: number): Observable<void> {

      if(confirm('Do You want to delete this user?')){
      //   // return this.http.delete<void>(`${this.baseUrl}/${id}`)
      }
      return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }
    getDataById(id:number){
    return  this.http.get(`${this.baseUrl}/${id}`)
    }
    
}