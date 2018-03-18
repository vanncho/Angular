import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';
import {CookieService} from 'angular2-cookie/core';

import {RegisterModel} from '../models/inputs/register.model';
import {LoginModel} from '../models/inputs/login.model';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';

@Injectable()
export class AuthenticationService {

  private subscription: ISubscription;
  private url: string;
  private loginStr: string;
  private logoutStr: string;
  private isLogged: boolean;

  constructor(private authUtil: AuthUtil,
              private _cookieService: CookieService,
              private httpClientService: HttpClientService) {
    this.loginStr = '/login';
    this.logoutStr = '/_logout';
    this.isLogged = false;
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  removeCookie() {
    this._cookieService.remove('authtoken');
  }

//  login(loginModel: LoginModel) {
//
//    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey + this.loginStr;
//
//    return this.httpClientService.post(this.url, JSON.stringify(loginModel), this.authUtil.headersBasic());
//  }

 login(loginModel: LoginModel) {

    return this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic());
  }
  
//  register(registerModel: RegisterModel): Observable<Object> {
//
//    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey;
//
//    return this.httpClientService.post(this.url, JSON.stringify(registerModel), this.authUtil.headersBasic());
//  }
  
  register(registerModel: RegisterModel): Observable<Object> {
    
    return this.httpClientService.post('/api/register', JSON.stringify(registerModel), this.authUtil.headersBasic());
  }

//  logout() {
//
//    this.removeCookie();
//
//    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey + this.logoutStr;
//
//    return this.httpClientService.post(this.url, '', this.authUtil.headersKinvey());
//  }

  logout() {

    return this.httpClientService.post('/api/logout', '', this.authUtil.headersBasic());
  }
  
  isLoggedIn(): boolean {

    const localStorageAuthtoken: string = localStorage.getItem('authtoken');
    const cookieAuthtoken = this.getCookie('authtoken');

    return localStorageAuthtoken === cookieAuthtoken;
  }

  setLoginStatus() {
    
    return this.httpClientService.get('/api/isAuthenticated', this.authUtil.headersEmpty());

  }
  
  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
