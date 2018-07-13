import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';


const authRoutes: Routes = [
    // {
    //     path: '',
    //     component: SigninComponent
    // },
    // {
    //     path: '**',
    //     redirectTo: '/404'
    // }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(authRoutes)
    ]
})

export class AuthRoutingModule {}
