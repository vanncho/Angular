import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartModules } from './index';

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
