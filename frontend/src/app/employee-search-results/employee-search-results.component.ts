import { Component } from '@angular/core';
import { Role } from '../models/role.model';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-employee-search-results',
  templateUrl: './employee-search-results.component.html',
  styleUrls: ['./employee-search-results.component.scss']
})
export class EmployeeSearchResultsComponent {
  roles:Role[]=[];
  title="Search Results"
  constructor(private apiService: APIService) {
    this.roles = apiService.employeeSearchResults;
  }
}
