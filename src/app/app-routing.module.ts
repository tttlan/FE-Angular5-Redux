import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './containers/not-found-page/not-found-page';
import { AuthGuard } from './services/auth-guard.service';

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
        loadChildren: 'app/modules/auth.module#AuthModule'
    },
    {
        path: 'home',
        loadChildren: 'app/modules/home.module#HomeModule',
        // canActivate: [AuthGuard],
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