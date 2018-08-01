import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { CoreModule } from '../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        CoreModule
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        SettingComponent
    ]
})
export class AdminModule { }
