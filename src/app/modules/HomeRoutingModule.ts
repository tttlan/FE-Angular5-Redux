import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../containers/home/HomePageComponent';

const routes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent
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

export class HomeRoutingModule {}
