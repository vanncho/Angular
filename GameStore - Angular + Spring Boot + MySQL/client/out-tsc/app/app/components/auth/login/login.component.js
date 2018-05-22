var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../../../core/models/inputs/login.model';
import { AuthenticationService } from '../../../core/services/auth.service';
var LoginComponent = (function () {
    function LoginComponent(authentication, _cookieService, toastr, router) {
        this.authentication = authentication;
        this._cookieService = _cookieService;
        this.toastr = toastr;
        this.router = router;
        this.model = new LoginModel('', '');
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
        var passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);
        if (usernameRegex.test(this.model.username) && passwordRegex.test(this.model.password)) {
            this.subscription = this.authentication.login(this.model).subscribe(function (data) {
                console.log(data);
                _this.successfulLogin(data);
                _this.toastr.success('You have login successfully.');
            });
        }
        else {
            this.invalidUsername = true;
            this.invalidPassword = true;
        }
    };
    LoginComponent.prototype.successfulLogin = function (data) {
        console.log(data);
        this._cookieService.put('authtoken', data.token);
        this._cookieService.put('userrole', data['role']);
        this._cookieService.put('userid', data['id']);
        localStorage.setItem('authtoken', data.token);
        localStorage.setItem('username', data['username']);
        this.loginFail = false;
        this.router.navigate(['/home']);
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            CookieService,
            ToastrService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map