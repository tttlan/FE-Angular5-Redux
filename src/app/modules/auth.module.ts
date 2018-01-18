import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAngularForms from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from './core.module';
import { AuthService } from '../services/auth.service';
import { reducers } from '../reducers/auth/index';
import { AuthEffects } from '../effects/auth.effect';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from '../containers/auth/sign-in-page';
import { LoginFormComponent } from '../components/auth/LoginFormComponent';

const COMPONENTS = [
    SignInComponent,
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
