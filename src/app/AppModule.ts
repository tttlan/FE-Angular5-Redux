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
import { AppRoutingModule } from './AppRoutingModule';

// import app component
import { AppPageComponent } from './AppPageComponent';
import { CoreModule } from './core/CoreModule';
import { AuthModule } from './auth/AuthModule';

// import { TokenInterceptor } from "./utils/TokenInterceptor";

@NgModule({
    declarations: [
        AppPageComponent
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
        AuthModule.forRoot()
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
    bootstrap: [AppPageComponent]
})

export class AppModule { }
