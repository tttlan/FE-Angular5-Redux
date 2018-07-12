import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromAuthReducers from './auth/store/index';
import {Observable} from "rxjs/Observable";
import { AuthStore } from './models/AuthModel';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app',
    templateUrl: './AppPageView.html'
})

export class AppPageComponent   {
    loggedIn$: Observable<boolean>;

    constructor(private store: Store<AuthStore>) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
    }

    ngOnInit() {
    }
}
