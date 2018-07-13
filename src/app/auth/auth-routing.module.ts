import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';


const authRoutes: Routes = [
    // {
    //     path: 'sign-up',
    //     component: SignupComponent
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
