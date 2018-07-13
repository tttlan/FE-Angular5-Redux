import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '../../../../node_modules/@angular/forms';

import { Auth, initialAuth, AuthStore } from '../../models/AuthModel';
import RS from '../../shared/resources/ResourceManager';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuthReducers from '../store/index';

@Component({
    moduleId: module.id,
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
    resource: any;
    auth: Auth;
    error$: Observable<any>;
    loading$: Observable<boolean>;

    constructor(private store: Store<AuthStore>) { }

    ngOnInit() {
        this.resource = RS;
        this.auth = initialAuth;
    }

    onSignup(form: NgForm) {
        this.auth.email = form.value.email;
        this.auth.password = form.value.password;
    }
}
