import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { gameComponents } from './index';

import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../../core/services/auth.service';
import { GamesAdminComponent } from './games-admin/games-admin.component';
import { AddEditGameComponent } from './add-edit-game/add-edit-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { DetailsGameComponent } from './details-game/details-game.component';


@NgModule({
  declarations: [
    ...gameComponents,
    GamesAdminComponent,
    AddEditGameComponent,
    DeleteGameComponent,
    DetailsGameComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...gameComponents
  ],
  providers: [
    AuthenticationService
    ]
})

export class GameModule { }
