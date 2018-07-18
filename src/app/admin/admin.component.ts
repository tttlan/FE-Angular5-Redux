import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../_animations/fade-in.animation';
import { RouterOutlet } from '../../../node_modules/@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    animations: [fadeInAnimation]
})

export class AdminComponent implements OnInit {

    constructor() {

    }
    ngOnInit() {
    }

    getState(outlet: RouterOutlet) {
        return outlet.activatedRouteData.state;
    }
}
