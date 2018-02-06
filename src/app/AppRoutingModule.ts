import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './containers/not-found/NotFoundComponent';
import { AuthGuardService } from './services/AuthGuardService';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/sign-in'
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: 'auth',
        loadChildren: 'app/modules/auth.module#AuthModule'
    },
    {
        path: 'home',
        loadChildren: 'app/modules/home.module#HomeModule',
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
