import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import { TranslateService } from '@ngx-translate/core';

import * as fromAuthReducers from '../../auth/store/index';
import * as fromAuthActions from '../../auth/store/auth.actions';
import { AuthStore } from '../../models/AuthModel';
import { User } from '../../models/UserModel';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent   {
    loggedIn$: Observable<boolean>;
    user$: Observable<User>;
    constructor(private store: Store<AuthStore>,
                private translate: TranslateService) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
        
        //Setting locallize
        this.translate.addLangs(['en', 'vn']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|vn/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.user$ = this.store.select(fromAuthReducers.getUser);
    }

    onLogout() {
        this.store.dispatch(new fromAuthActions.SignOutAction());
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
