import { Injectable } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

const authtoken = 'authtoken';
const userrole = 'userrole';
const userid = 'userid';

@Injectable()
export class CookieManagerService {

  constructor(private _cookieService: CookieService) { }

  saveLoginData(data) {

    this._cookieService.put(authtoken, data.token);
    this._cookieService.put(userrole, data.role);
    this._cookieService.put(userid, data.id);
  }

  removeLoginData() {
    
    this._cookieService.remove(authtoken);
    this._cookieService.remove(userrole);
    this._cookieService.remove(userid);
  }

  get(key) {

    return this._cookieService.get(key);
  }
}
