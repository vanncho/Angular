import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeComponents } from './index';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';

@NgModule({
  declarations: [
    ...homeComponents,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...homeComponents
  ],
})

export class HomeModule { }
