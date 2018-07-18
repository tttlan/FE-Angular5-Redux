import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './services/AuthGuardService';
import { NotFoundPageComponent } from './components/not-found/not-found-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {
		path: '',
		redirectTo: 'sign-in',
		pathMatch: 'full'
	},
    {
        path: 'sign-in',
        component: SigninComponent
    },
    {
        path: 'sign-up',
        component: SignupComponent
    },
    {
        path: 'admin',
        canActivate: [AuthGuardService],
        loadChildren: '../app/admin/admin.module#AdminModule'
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
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule { }
