import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app',
    template: `
        <layout>
            <router-outlet></router-outlet>
        </layout>
    `
})

export class AppPageComponent   {





}
