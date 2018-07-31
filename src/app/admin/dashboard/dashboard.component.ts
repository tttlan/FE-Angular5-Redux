import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
	selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	pageTitle = 'Dashboard';

	constructor(private title: Title) { }

	ngOnInit() {
		this.title.setTitle(this.pageTitle);
	}

}
