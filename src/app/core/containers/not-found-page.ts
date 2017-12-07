import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NotFoundPageResource } from '../resources/not-found-page.resource';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'not-found-page',
    template: `
        <div class="not-found-page text-center">
            <mat-card class="not-found-page__card">
                <mat-card-content>
                    <img height="400" mat-card-mat-image src="{{resource.card_img}}" alt="{{resource.card_img_alt}}">
                </mat-card-content>
                <mat-card-footer>
                    <mat-card-actions>
                        <button mat-raised-button color="accent" routerLink="/">{{resource.card_action}}</button>
                    </mat-card-actions>
                </mat-card-footer>
            </mat-card>
        </div>
    `
})

export class NotFoundPageComponent {
    public resource = NotFoundPageResource;

    
}