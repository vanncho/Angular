import { NgModule } from '@angular/core';

import { sharedComponents } from './index';

import { CommonModule } from '@angular/common';

import {AuthenticationService} from '../../core/services/auth.service';


@NgModule({
  declarations: [
    ...sharedComponents,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...sharedComponents
  ],
  providers: [
    AuthenticationService
    ]
})

export class SharedModule { }
