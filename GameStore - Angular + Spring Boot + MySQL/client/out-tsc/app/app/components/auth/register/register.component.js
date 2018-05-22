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
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from '../../../core/models/inputs/register.model';
import { AuthenticationService } from '../../../core/services/auth.service';
var RegisterComponent = (function () {
    function RegisterComponent(authentication, toastr, router) {
        this.authentication = authentication;
        this.toastr = toastr;
        this.router = router;
        this.model = new RegisterModel('', '', '', '', '');
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var fullNameRegex = new RegExp(/^([A-Z]+[a-z]+ [A-Z]+[a-z]+)$/);
        var usernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
        var passwordRegex = new RegExp(/^[A-Za-z0-9]{3,}$/);
        if (fullNameRegex.test(this.model.fullName) &&
            usernameRegex.test(this.model.username) &&
            passwordRegex.test(this.model.password)) {
            var registerModel = new RegisterModel(this.model.fullName, this.model.email, this.model.username, this.model.password);
            this.subscription = this.authentication.register(registerModel).subscribe(function (data) {
                _this.successfulRegister(data);
                _this.toastr.success('Registration successfully.');
                _this.router.navigate(['/login']);
            });
        }
    };
    RegisterComponent.prototype.successfulRegister = function (data) {
        this.registerSuccess = true;
        this.registeredUser = data['username'];
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            ToastrService,
            Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map