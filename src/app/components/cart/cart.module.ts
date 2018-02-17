import { NgModule } from '@angular/core';

import { cartModules } from './index';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ...cartModules
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...cartModules
  ],
  providers: [
  ]
})

export class CartModule { }
