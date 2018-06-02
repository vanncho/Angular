import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

const authtoken = 'authtoken';
const fullName = 'fullName';
const userrole = 'userrole';
const userid = 'userid';

@Injectable()
export class CookieManagerService {

  constructor(private _cookieService: CookieService) { }

  saveLoginData(data): void {

    this._cookieService.put(authtoken, data.token);
    this._cookieService.put(fullName, data.fullName);
    this._cookieService.put(userrole, data.role);
    this._cookieService.put(userid, data.id);
  }

  removeLoginData(): void {

    this._cookieService.remove(authtoken);
    this._cookieService.remove(fullName);
    this._cookieService.remove(userrole);
    this._cookieService.remove(userid);
  }

  add(key, value): void {

    this._cookieService.put(key, value);
  }

  get(key): string {

    return this._cookieService.get(key);
  }
}
