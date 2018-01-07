import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './containers/not-found-page/not-found-page';

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