import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeComponents } from './index';

import { TruncatePipe } from '../../core/pipes/truncate.pipe';

@NgModule({
  declarations: [
    TruncatePipe,
    ...homeComponents,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...homeComponents
  ],
  providers: [
    ]
})

export class HomeModule { }
