import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  companyId = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
    });
  }

  ngOnInit(): void {
  }

}
