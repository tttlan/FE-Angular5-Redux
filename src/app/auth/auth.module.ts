import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAngularForms from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from '../services/AuthService';
import { AuthEffects } from './store/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { LoginFormComponent } from './signin/login-form/login-form.component';
import { reducers } from './store/index';
import { CoreModule } from '../core/core.module';

const COMPONENTS = [
    SigninComponent,
    LoginFormComponent
];

@NgModule({
    exports: COMPONENTS,
    imports: [
        CommonModule,
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        AuthRoutingModule,
        CoreModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects])

    ],
    declarations: COMPONENTS,
    // providers: [AuthService]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService
            ]
        };
    }
}