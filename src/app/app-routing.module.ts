import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/AuthGuardService';
import { NotFoundPageComponent } from './components/not-found/NotFoundPageComponent';
import { SigninComponent } from './auth/signin/signin.component';
import { HomePageComponent } from './core/home/homepage.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
    {
        path: '',
        // loadChildren: 'app/modules/HomeModule#HomeModule',
        component: HomePageComponent,
        canActivate: [AuthGuardService],
    },
    {
        path: 'sign-in',
        component: SigninComponent
    },
    {
        path: 'sign-up',
        component: SignupComponent
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
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule { }
