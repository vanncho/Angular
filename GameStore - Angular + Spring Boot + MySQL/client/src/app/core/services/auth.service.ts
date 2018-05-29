import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';

import {RegisterModel} from '../models/inputs/register.model';
import {LoginModel} from '../models/inputs/login.model';
import {AuthUtil} from '../utils/auth.util';
import {HttpClientService} from './http-client.service';
import {CookieManagerService} from '../../core/services/cookie-manager.service';

@Injectable()
export class AuthenticationService {

  private subscription: ISubscription;
  private url: string;
  private loginStr: string;
  private logoutStr: string;
  private isLogged: boolean;

  constructor(private authUtil: AuthUtil,
              private cookieService: CookieManagerService,
              private httpClientService: HttpClientService) {
    this.loginStr = '/login';
    this.logoutStr = '/_logout';
    this.isLogged = false;
  }

  login(loginModel: LoginModel) {

    return this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic());
 }

  register(registerModel: RegisterModel): Observable<Object> {

    return this.httpClientService.post('/api/register', JSON.stringify(registerModel), this.authUtil.headersBasic());
  }

  logout() {

    return this.httpClientService.get('/api/logout', this.authUtil.headersBasic());
  }

  isLoggedIn(): boolean {

    return this.cookieService.get('authtoken') !== undefined;
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
