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
import { AuthenticationService } from '../../../core/services/auth.service';
import { CookieService } from 'angular2-cookie/core';
var HeaderComponent = (function () {
    function HeaderComponent(authenticationService, _cookieService) {
        this.authenticationService = authenticationService;
        this._cookieService = _cookieService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.showHideNavigation = function () {
        return this.authenticationService.isLoggedIn();
    };
    HeaderComponent.prototype.isAdmin = function () {
        var role = this._cookieService.get('userrole');
        if (role === 'admin') {
            this.admin = true;
        }
        else {
            this.admin = false;
        }
        return this.admin;
    };
    HeaderComponent = __decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            CookieService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map