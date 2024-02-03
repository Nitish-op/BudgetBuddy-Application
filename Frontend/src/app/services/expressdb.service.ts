import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ExpressdbService {
  constructor(private http:HttpClient) { }
  signup(user:any){
    return this.http.post('http://localhost:4500/users/signup',user,({responseType:'json'}));
  }

  login(user:any){
    return this.http.post('http://localhost:4500/users/login',user,({responseType:'json'}));
  }

  newcard(card:any){
    return this.http.post('http://localhost:4500/users/newcard', card, ({responseType:'json'}))
  }
  
  allcards(userName: string) {
    console.log("connection" + userName);
    return this.http.post('http://localhost:4500/users/allCards', { userName: userName }, { responseType: 'json' });
  }
  

  updatecard(card:any){
    return this.http.post('http://localhost:4500/users/cardDetails', card, ({responseType:'json'}))
  }

  deletecard(card:any){
    return this.http.post('http://localhost:4500/users/cardDetails', card, ({responseType:'json'}))
  }
}