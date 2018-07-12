import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAngularForms from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from '../services/AuthService';
import { AuthEffects } from './store/AuthEffect';
import { AuthRoutingModule } from './AuthRoutingModule';
import { SignInPageComponent } from './signin/SignInPageComponent';
import { LoginFormComponent } from './signin/login-form/LoginFormComponent';
import { CoreModule } from '../core/CoreModule';
import { reducers } from './store/index';

const COMPONENTS = [
    SignInPageComponent,
    LoginFormComponent
];

@NgModule({
    exports: COMPONENTS,
    imports: [
        CommonModule,
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        AuthRoutingModule,
        CoreModule.forRoot(),
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: COMPONENTS
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
