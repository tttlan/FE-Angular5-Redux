import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './auth/store/CoreReducer';
import { CustomRouterStateSerializer } from './utils/Utils';

// import settings
import { AppSettings } from './shared/enums/AppSettings';

// import new module
import { AppRoutingModule } from './app-routing.module';

// import app component
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthService } from './services/AuthService';

// import { TokenInterceptor } from "./utils/TokenInterceptor";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule,
        AppSettings.ENVIRONMENT === 'dev' ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([]),

        AppRoutingModule,
        CoreModule.forRoot(),
        AuthModule.forRoot(),
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomRouterStateSerializer
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TokenInterceptor,
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
