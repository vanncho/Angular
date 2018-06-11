import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin/admin.guard';
import { AuthenticationService } from '../../core/services/authentication.service';

import { adminComponents } from './index';
import { CategoryEditComponent } from './category-edit/category-edit.component';


@NgModule({
    declarations: [
        ...adminComponents,
        CategoryEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([ // Lazy loading !
            {path: 'home', canActivate: [AdminGuard], component: adminComponents[0]},
            {path: 'users', canActivate: [AdminGuard], component: adminComponents[1]},
            {path: 'users/edit/:id', canActivate: [AdminGuard], component: adminComponents[2]},
            {path: 'categories', canActivate: [AdminGuard], component: adminComponents[3]},
            {path: 'categories/add', canActivate: [AdminGuard], component: adminComponents[4]},
            {path: 'categories/edit/:id', canActivate: [AdminGuard], component: adminComponents[5]}
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
