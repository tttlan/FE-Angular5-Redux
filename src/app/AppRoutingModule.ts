import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './containers/not-found/NotFoundPageComponent';
import { AuthGuardService } from './services/AuthGuardService';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/sign-in'
    },
    {
        path: '404',
        component: NotFoundPageComponent
    },
    {
        path: 'auth',
        loadChildren: 'app/modules/AuthModule#AuthModule'
    },
    {
        path: 'home',
        loadChildren: 'app/modules/HomeModule#HomeModule',
        // canActivate: [AuthGuardService],
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
        RouterModule.forRoot(routes, { useHash: false })
    ]
})

export class AppRoutingModule { }
