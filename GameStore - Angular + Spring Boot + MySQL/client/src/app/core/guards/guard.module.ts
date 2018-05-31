import { NgModule } from '@angular/core';
import { guardsModules } from './index';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../../core/services/auth.service';


@NgModule({
  declarations: [
    ...guardsModules
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...guardsModules
  ],
  providers: [
    AuthenticationService
  ]
})

export class GuardModule { }
