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
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEditModel } from '../../../core/models/inputs/add-edit-game.model';
import { GameService } from '../../../core/services/game.service';
import { AuthUtil } from '../../../core/utils/auth.util';
var DetailsGameComponent = (function () {
    function DetailsGameComponent(authUtil, route, sanitizer, gameService) {
        this.authUtil = authUtil;
        this.route = route;
        this.sanitizer = sanitizer;
        this.gameService = gameService;
        this.game = new AddEditModel('', '', '', 0, 0, '', '');
    }
    DetailsGameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.admin = this.authUtil.isAdmin();
        this.currGameId = this.route.params['value'].id;
        this.subscription = this.gameService.getGameById(this.currGameId).subscribe(function (data) {
            _this.game.title = data['title'];
            _this.game.description = data['description'];
            _this.game.thumbnail = data['thumbnail'];
            _this.game.price = data['price'];
            _this.game.size = data['size'];
            _this.game.video = data['video'];
            _this.game.date = data['date'];
        });
        this.prevUrl = localStorage.getItem('prevUrl');
    };
    DetailsGameComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DetailsGameComponent = __decorate([
        Component({
            selector: 'app-details-game',
            templateUrl: './details-game.component.html',
            styleUrls: ['./details-game.component.css']
        }),
        __metadata("design:paramtypes", [AuthUtil,
            ActivatedRoute,
            DomSanitizer,
            GameService])
    ], DetailsGameComponent);
    return DetailsGameComponent;
}());
export { DetailsGameComponent };
//# sourceMappingURL=details-game.component.js.map