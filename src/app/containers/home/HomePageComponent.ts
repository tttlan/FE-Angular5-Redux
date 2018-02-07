import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BaseService} from "../../services/BaseService";

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'home',
    templateUrl: './HomePageView.html'
})

export class HomeComponent implements OnInit {

    constructor(private http: BaseService) {

    }
    ngOnInit() {
    }
}
