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
import { HttpHeaders } from '@angular/common/http';
var AuthUtil = (function () {
    function AuthUtil(_cookieService) {
        this._cookieService = _cookieService;
        this._appKey = 'kid_rywOkXPbf';
        this._appSecret = '5dd47f33591d4b27b360d4faa07a0501';
        this._kinveyBaseUrl = 'https://baas.kinvey.com/appdata/';
        this._kinveyUserUrl = 'https://baas.kinvey.com/user/';
    }
    AuthUtil.prototype.headersKinvey = function () {
        return {
            headers: this.getAuthHeaders('Kinvey')
        };
    };
    AuthUtil.prototype.headersBasic = function () {
        return {
            headers: this.getAuthHeaders('Basic')
        };
    };
    AuthUtil.prototype.headersEmpty = function () {
        return new HttpHeaders({});
    };
    Object.defineProperty(AuthUtil.prototype, "appKey", {
        get: function () {
            return this._appKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthUtil.prototype, "appSecret", {
        get: function () {
            return this._appSecret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthUtil.prototype, "kinveyBaseUrl", {
        get: function () {
            return this._kinveyBaseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthUtil.prototype, "kinveyUserUrl", {
        get: function () {
            return this._kinveyUserUrl;
        },
        enumerable: true,
        configurable: true
    });
    AuthUtil.prototype.isAdmin = function () {
        var role = this._cookieService.get('userrole');
        if (role === 'admin') {
            this.admin = true;
        }
        else {
            this.admin = false;
        }
        return this.admin;
    };
    AuthUtil.prototype.getAuthHeaders = function (type) {
        var headersObject = {};
        headersObject['Content-Type'] = 'application/json';
        var token = localStorage.getItem('authtoken');
        if (token) {
            headersObject['Authorization'] = 'Bearer ' + token;
        }
        return new HttpHeaders(headersObject);
    };
    AuthUtil = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService])
    ], AuthUtil);
    return AuthUtil;
}());
export { AuthUtil };
//# sourceMappingURL=auth.util.js.map