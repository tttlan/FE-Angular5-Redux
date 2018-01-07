import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'home',
    templateUrl: './home-page.html'
})

export class HomeComponent implements OnInit {
    ngOnInit() {
    }
}