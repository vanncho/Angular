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
import { AuthUtil } from '../utils/auth.util';
import { HttpClientService } from './http-client.service';
var MyGamesService = (function () {
    function MyGamesService(authUtil, httpClientService) {
        this.authUtil = authUtil;
        this.httpClientService = httpClientService;
        this.collectionName = '/mygames';
    }
    MyGamesService.prototype.getAllGamesByUser = function (userId) {
        this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + ("?query={\"user\":\"" + userId + "\"}");
        return this.httpClientService.get(this.url, this.authUtil.headersKinvey());
    };
    MyGamesService.prototype.addToMyGames = function (gameObject) {
        this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName;
        return this.httpClientService.post(this.url, JSON.stringify(gameObject), this.authUtil.headersKinvey());
    };
    MyGamesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthUtil,
            HttpClientService])
    ], MyGamesService);
    return MyGamesService;
}());
export { MyGamesService };
//# sourceMappingURL=mygames.service.js.map