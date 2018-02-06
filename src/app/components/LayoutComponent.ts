import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <mat-sidenav-container fullscreen>
            <ng-content></ng-content>
        </mat-sidenav-container>
    `
})

export class LayoutComponent {}