import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from '../containers/auth/SignInPageComponent';

const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInPageComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class AuthRoutingModule {}
