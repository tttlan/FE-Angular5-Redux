import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import RS from '../../shared/resources/resource-manager';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'not-found-page',
    templateUrl: './not-found.page.html'
})

export class NotFoundPageComponent implements OnInit{
    resource: any;

    ngOnInit() {
        this.resource = RS;
    }
}