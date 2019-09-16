import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { register } from './customer-registration/register';
// import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AgentserviceService {
  // tslint:disable-next-line:variable-name
  _url = 'http://localhost:8080/users/save';

  _urlgetall = 'http://localhost:8080/users'

_urlDeleteRow = ' http://localhost:8080/users/delete'

  constructor(private http: HttpClient) { }

  registeration(reg: register) {
    return this.http.post<any>(this._url, reg);
  }

  get_Users() {
    return this.http.get(this._urlgetall);
  }


  delete_row(_id : string){
    return this.http.delete(this._urlDeleteRow + `/${_id}`);
  }


}