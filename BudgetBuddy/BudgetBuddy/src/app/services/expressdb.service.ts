import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ExpressdbService {
  constructor(private http:HttpClient) { }
  register(user:any){
    return this.http.post('http://localhost:4500/users/register',user,({responseType:'text'}));
  }
  login(user:any){
    return this.http.post('http://localhost:4500/users/login',user);
  }
}