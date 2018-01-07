import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

import { MessageErrorResource } from '../shared/resources/msg-error.resource';
import { UIUtils } from '../utils/ui-utils';

const uiUtil = new UIUtils();

@Component({
    moduleId: module.id,
    selector: 'show-errors',
    template: `
        <ul *ngIf="showErrors()" class="ul-invalid">
            <li class="invalid-feedback" *ngFor="let error of errors()">{{error}}</li>
        </ul>
    `
})
export class ShowErrorsComponent {
    private static readonly errorMessage = {
        required: () => MessageErrorResource.msg_requried,
        minLength: (params) => uiUtil.formatString(MessageErrorResource.msg_min_length, params.requiredLength),
        maxLength: (params) => uiUtil.formatString(MessageErrorResource.msg_max_length, params.requiredLength),
        pattern: (params) => uiUtil.formatString(MessageErrorResource.msg_pattern, params.requiredPattern),
        password: (params) => params.message,
        inputPattern: (params) => params.message
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    public showErrors(): boolean {
        return this.control &&
            this.control.errors && (this.control.dirty || this.control.touched);
    }

    public errors(): string[] {
        return Object.keys(this.control.errors)
            .map(filed => this.getMessage(filed, this.control.errors[filed]));
    }

    private getMessage(type: string, params: any) {
        return ShowErrorsComponent.errorMessage[type](params);
    }
}