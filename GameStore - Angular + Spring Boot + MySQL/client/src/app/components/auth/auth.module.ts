import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authenticationComponents } from './index';

import { AuthenticationService } from '../../core/services/auth.service';


@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ...authenticationComponents
  ],
  providers: [
    AuthenticationService
    ]
})

export class AuthModule { }
