var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GamesAdminComponent } from './components/game/games-admin/games-admin.component';
// Guards
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AdminGuard } from './core/guards/admin/admin.guard';
import { HomeBasicComponent } from './components/home-basic/home-basic.component';
import { AddEditGameComponent } from './components/game/add-edit-game/add-edit-game.component';
import { DeleteGameComponent } from './components/game/delete-game/delete-game.component';
import { DetailsGameComponent } from './components/game/details-game/details-game.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
var routes = [
    {
        //    path: 'home', canActivate: [AuthGuard], component: HomeBasicComponent
        path: 'home', component: HomeBasicComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', canActivate: [AuthGuard], component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'games', canActivate: [AdminGuard], component: GamesAdminComponent },
    { path: 'game/:id', canActivate: [AdminGuard], component: AddEditGameComponent },
    { path: 'delete/:id', canActivate: [AdminGuard], component: DeleteGameComponent },
    { path: 'details/:id', canActivate: [AuthGuard], component: DetailsGameComponent },
    { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
    { path: '**', component: NotFoundComponent }
];
var AppRoutesModule = (function () {
    function AppRoutesModule() {
    }
    AppRoutesModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutesModule);
    return AppRoutesModule;
}());
export { AppRoutesModule };
//# sourceMappingURL=app-routing.module.js.map