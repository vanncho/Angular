var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AuthUtil } from '../utils/auth.util';
import { HttpClientService } from './http-client.service';
var AuthenticationService = (function () {
    function AuthenticationService(authUtil, _cookieService, httpClientService) {
        this.authUtil = authUtil;
        this._cookieService = _cookieService;
        this.httpClientService = httpClientService;
        this.loginStr = '/login';
        this.logoutStr = '/_logout';
        this.isLogged = false;
    }
    AuthenticationService.prototype.getCookie = function (key) {
        return this._cookieService.get(key);
    };
    AuthenticationService.prototype.removeCookie = function () {
        this._cookieService.remove('authtoken');
    };
    //  login(loginModel: LoginModel) {
    //
    //    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey + this.loginStr;
    //
    //    return this.httpClientService.post(this.url, JSON.stringify(loginModel), this.authUtil.headersBasic());
    //  }
    AuthenticationService.prototype.login = function (loginModel) {
        return this.httpClientService.post('/api/login', JSON.stringify(loginModel), this.authUtil.headersBasic());
    };
    //  register(registerModel: RegisterModel): Observable<Object> {
    //
    //    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey;
    //
    //    return this.httpClientService.post(this.url, JSON.stringify(registerModel), this.authUtil.headersBasic());
    //  }
    AuthenticationService.prototype.register = function (registerModel) {
        return this.httpClientService.post('/api/register', JSON.stringify(registerModel), this.authUtil.headersBasic());
    };
    //  logout() {
    //
    //    this.removeCookie();
    //
    //    this.url = this.authUtil.kinveyUserUrl + this.authUtil.appKey + this.logoutStr;
    //
    //    return this.httpClientService.post(this.url, '', this.authUtil.headersKinvey());
    //  }
    AuthenticationService.prototype.logout = function () {
        return this.httpClientService.get('/api/logout', this.authUtil.headersBasic());
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        var localStorageAuthtoken = localStorage.getItem('authtoken');
        var cookieAuthtoken = this.getCookie('authtoken');
        return localStorageAuthtoken === cookieAuthtoken;
    };
    AuthenticationService.prototype.setLoginStatus = function () {
        return this.httpClientService.get('/api/isAuthenticated', this.authUtil.headersEmpty());
    };
    AuthenticationService.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthUtil,
            CookieService,
            HttpClientService])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=auth.service.js.map