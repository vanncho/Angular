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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthUtil } from '../utils/auth.util';
import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
var GameService = (function () {
    function GameService(authUtil, httpClientService, httpClient) {
        this.authUtil = authUtil;
        this.httpClientService = httpClientService;
        this.httpClient = httpClient;
        this.collectionName = '/games';
    }
    GameService.prototype.getAllGames = function () {
        return this.httpClientService.get('/api/allGames', this.authUtil.headersBasic());
    };
    GameService.prototype.getGameById = function (gameId) {
        this.url = '/api/details/' + gameId;
        return this.httpClientService.get(this.url, this.authUtil.headersBasic());
    };
    GameService.prototype.editGame = function (gameId, gameObject) {
        this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + '/' + gameId;
        return this.httpClientService.put(this.url, JSON.stringify(gameObject), this.authUtil.headersKinvey());
    };
    GameService.prototype.addGame = function (gameObject) {
        this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName;
        return this.httpClientService.post(this.url, JSON.stringify(gameObject), this.authUtil.headersKinvey());
    };
    GameService.prototype.deleteGame = function (gameId) {
        this.url = this.authUtil.kinveyBaseUrl + this.authUtil.appKey + this.collectionName + '/' + gameId;
        return this.httpClientService.delete(this.url, this.authUtil.headersKinvey());
    };
    GameService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthUtil,
            HttpClientService,
            HttpClient])
    ], GameService);
    return GameService;
}());
export { GameService };
//# sourceMappingURL=game.service.js.map