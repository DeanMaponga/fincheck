import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit{
  isLoading = true;
  searchQuery = '';
  employees:Employee[]=[];
  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiService.getEmployees()
    .then((results) => {
      this.isLoading = false;
      this.employees = results.data;
    })
    .catch((error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  searchEmployees() {
    this.isLoading = true;
    this.apiService.searchEmployee({"name":this.searchQuery})
    .then((results) => {
      this.isLoading = false;
      this.employees = results["data"];
    })
    .catch((error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
}
