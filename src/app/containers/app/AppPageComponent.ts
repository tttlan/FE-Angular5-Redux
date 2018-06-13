import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthStore} from "../../models/AuthModel";
import * as fromAuthReducers from '../../reducers/auth/index';
import {Observable} from "rxjs/Observable";

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
