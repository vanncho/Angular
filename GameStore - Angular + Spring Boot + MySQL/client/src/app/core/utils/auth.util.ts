import {Injectable} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthUtil {

  private admin: boolean;
  private _appKey: string;
  private _appSecret: string;
  private _kinveyBaseUrl: string;
  private _kinveyUserUrl: string;

  constructor(private _cookieService: CookieService) {
    this._appKey = 'kid_rywOkXPbf';
    this._appSecret = '5dd47f33591d4b27b360d4faa07a0501';
    this._kinveyBaseUrl = 'https://baas.kinvey.com/appdata/';
    this._kinveyUserUrl = 'https://baas.kinvey.com/user/';
  }

  headersKinvey(): object {
    return {
      headers: this.getAuthHeaders('Kinvey')
    };
  }

  headersBasic(): object {

    return {
      headers: this.getAuthHeaders('Basic')
    };
  }

  headersEmpty(): object {
    return new HttpHeaders({});
  }
  
  get appKey(): string {
    return this._appKey;
  }

  get appSecret(): string {
    return this._appSecret;
  }

  get kinveyBaseUrl(): string {
    return this._kinveyBaseUrl;
  }

  get kinveyUserUrl(): string {
    return this._kinveyUserUrl;
  }

  isAdmin(): boolean {

    const role = this._cookieService.get('userrole');

    if (role === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    return this.admin;
  }

  getAuthHeaders(type: string): HttpHeaders {

    let headersObject = {};
   
    headersObject['Content-Type'] = 'application/json';
    let token = localStorage.getItem('authtoken');
    
    if (token) {
      headersObject['Authorization'] = 'Bearer ' + token;
    }

    return new HttpHeaders(headersObject);

  }

}
