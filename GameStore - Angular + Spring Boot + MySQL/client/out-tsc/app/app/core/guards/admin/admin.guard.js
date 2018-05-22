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
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
var AdminGuard = (function () {
    function AdminGuard(_cookieService, router) {
        this._cookieService = _cookieService;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        return this.checkUserIsAdmin(state.url);
    };
    AdminGuard.prototype.canLoad = function (route) {
        return this.checkUserIsAdmin(route.path);
    };
    AdminGuard.prototype.checkUserIsAdmin = function (url) {
        if (this._cookieService.get('userrole') === 'admin') {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    };
    AdminGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService,
            Router])
    ], AdminGuard);
    return AdminGuard;
}());
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map