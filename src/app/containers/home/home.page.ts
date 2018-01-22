import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {BaseService} from "../../services/BaseService";
import {HttpClient} from "@angular/common/http";

@Component({
    moduleId: module.id,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'home',
    templateUrl: './home.page.html'
})

export class HomeComponent implements OnInit {

    constructor(private http: BaseService) {

    }
    ngOnInit() {
        this.http.get('http://jsonplaceholder.typicode.com/posts').then(data => {
            console.log(data);
        });
    }
}
