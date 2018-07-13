import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BaseService} from "../../services/BaseService";

@Component({
    moduleId: module.id,
    selector: 'app-homepage',
    templateUrl: './homepage.component.html'
})

export class HomePageComponent implements OnInit {

    constructor(private http: BaseService) {

    }
    ngOnInit() {
    }
}
