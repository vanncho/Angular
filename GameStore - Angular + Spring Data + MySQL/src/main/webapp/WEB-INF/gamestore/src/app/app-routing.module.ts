import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  {
//    path: 'home', canActivate: [AuthGuard], component: HomeBasicComponent
    path: 'home', component: HomeBasicComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'logout', canActivate: [AuthGuard], component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'games', canActivate: [AdminGuard], component: GamesAdminComponent},
  {path: 'game/:id', canActivate: [AdminGuard], component: AddEditGameComponent},
  {path: 'delete/:id', canActivate: [AdminGuard], component: DeleteGameComponent},
  {path: 'details/:id', canActivate: [AuthGuard], component: DetailsGameComponent},
  {path: 'cart', canActivate: [AuthGuard], component: CartComponent},
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutesModule {  }
