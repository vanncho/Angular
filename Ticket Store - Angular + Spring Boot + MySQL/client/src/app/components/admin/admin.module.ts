import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin/admin.guard';
import { AuthenticationService } from '../../core/services/authentication.service';

import { adminComponents } from './index';


@NgModule({
    declarations: [
        ...adminComponents
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([ // Lazy loading !
            {path: 'home', canActivate: [AdminGuard], component: adminComponents[0]},
            {path: 'users', canActivate: [AdminGuard], component: adminComponents[1]},
            {path: 'users/edit/:id', canActivate: [AdminGuard], component: adminComponents[2]}
        ]),
        FormsModule
    ],
    exports: [
        ...adminComponents
    ],
    providers: [
        AuthenticationService
    ]
})

export class AdminModule { }
