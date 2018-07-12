import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/AuthGuardService';
import { NotFoundPageComponent } from './components/not-found/NotFoundPageComponent';
import { SignInPageComponent } from './auth/signin/SignInPageComponent';

const routes: Routes = [
    {
        path: 'sign-in',
        component: SignInPageComponent
    },
    // {
    //     path: '404',
    //     component: NotFoundPageComponent
    // },
    // {
    //     path: 'auth',
    //     loadChildren: 'app/modules/AuthModule#AuthModule'
    // },
    // {
    //     path: 'home',
    //     loadChildren: 'app/modules/HomeModule#HomeModule',
    //     // canActivate: [AuthGuardService],
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
        RouterModule.forRoot(routes, { useHash: false })
    ]
})

export class AppRoutingModule { }
