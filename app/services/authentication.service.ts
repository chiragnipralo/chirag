import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
const TOKEN_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Init with null to filter out the first value in a guard!
  // isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await this.getItem(TOKEN_KEY);
    if (token){
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  logout(): Promise<void> {
    return Promise.resolve().then(()=>{
      this.isAuthenticated.next(false);
      localStorage.clear();
    });
  }

  setItem(key: any, value: any) {
    return Promise.resolve().then(()=> {
      localStorage.setItem(key, value);
    });
  }

  getItem(key: any) {
    return Promise.resolve().then(()=> {
      return localStorage.getItem(key);
    });
  }


}