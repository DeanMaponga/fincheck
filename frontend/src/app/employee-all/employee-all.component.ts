import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-employee-all',
  templateUrl: './employee-all.component.html',
  styleUrls: ['./employee-all.component.scss']
})
export class EmployeeAllComponent implements OnInit{
  isLoading = true;
  searchQuery = '';
  roles:Role[]=[];
  constructor(private apiService: APIService) {}

  ngOnInit(): void {
    this.apiService.getRoles()
    .then((results) => {
      this.isLoading = false;
      this.roles = results.data.reverse();
    })
    .catch((error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  searchRoles() {
    this.isLoading = true;
    this.apiService.searchRoles({"name":this.searchQuery})
    .then((results) => {
      this.isLoading = false;
      this.roles = results["data"];
    })
    .catch((error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
}
