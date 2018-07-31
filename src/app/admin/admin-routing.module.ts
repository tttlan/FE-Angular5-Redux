import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
	{
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { state: 'dashboard'} },
            { path: 'setting', component: SettingComponent, data: { state: 'setting'} }
        ]
    }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
