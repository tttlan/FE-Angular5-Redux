import { Component, ChangeDetectionStrategy } from '@angular/core';

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

export class AppPageComponent { }