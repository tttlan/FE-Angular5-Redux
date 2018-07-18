import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        SettingComponent
    ]
})
export class AdminModule { }
