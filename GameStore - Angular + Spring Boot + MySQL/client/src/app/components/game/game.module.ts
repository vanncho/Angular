import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { gameComponents } from './index';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/guards/auth/auth.guard';
import { AdminGuard } from '../../core/guards/admin/admin.guard';

import { AuthenticationService } from '../../core/services/auth.service';
import { GameService } from '../../core/services/game.service';

import { GamesAdminComponent } from './games-admin/games-admin.component';
import { AddEditGameComponent } from './add-edit-game/add-edit-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { DetailsGameComponent } from './details-game/details-game.component';


@NgModule({
  declarations: [
    ...gameComponents
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ // Lazy loading !
        {path: 'games', canActivate: [AdminGuard], component: GamesAdminComponent},
        {path: 'game/:id', canActivate: [AdminGuard], component: AddEditGameComponent},
        {path: 'delete/:id', canActivate: [AdminGuard], component: DeleteGameComponent},
        {path: 'details/:id', canActivate: [AuthGuard], component: DetailsGameComponent},
    ]),
    FormsModule
  ],
  exports: [
    ...gameComponents
  ],
  providers: [
    GameService,
    AuthenticationService
    ]
})

export class GameModule { }
