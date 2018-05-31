import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CookieService} from 'angular2-cookie/core';

import {RegisterModel} from '../models/inputs/register.model';
import {LoginModel} from '../models/inputs/login.model';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';

@Injectable()
export class AuthenticationService {

  private url: string;
  private loginStr: string;
  private logoutStr: string;

  constructor(private authUtil: AuthUtil,
              private _cookieService: CookieService,
              private httpClientService: HttpClientService) {
    this.loginStr = '/login';
    this.logoutStr = '/_logout';
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }

  removeCookie() {
    this._cookieService.remove('authtoken');
  }

  login(loginModel: LoginModel) {

    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey + this.loginStr;

    return this.httpClientService.post(this.url, JSON.stringify(loginModel), this.authUtil.headersBasic());
  }

  register(registerModel: RegisterModel): Observable<Object> {

    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey;

    return this.httpClientService.post(this.url, JSON.stringify(registerModel), this.authUtil.headersBasic());
  }

  logout() {

    this.removeCookie();

    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey + this.logoutStr;

    return this.httpClientService.post(this.url, '', this.authUtil.headersKinvey());
  }

  isLoggedIn() {

    const localStorageAuthtoken: string = localStorage.getItem('authtoken');
    const cookieAuthtoken = this.getCookie('authtoken');

    return localStorageAuthtoken === cookieAuthtoken;
  }

}
