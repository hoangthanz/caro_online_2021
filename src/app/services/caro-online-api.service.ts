import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class CaroOnlineApiService {


  constructor(private http: HttpClient,) { }


  public postRegisterUser = (registerModel: RegisterModel) => this.http.post(`${environment.caroDomain}/api/User/register`, registerModel, { responseType: 'text' });


  public postLoginUser = (loginModel: LoginModel) => this.http.post(`${environment.caroDomain}/api/User/login`, loginModel, { responseType: 'text' });
}
