import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit{
  role:Role|undefined;
  constructor(private apiService:APIService){}
  ngOnInit(): void {
      this.role =this.apiService.tempRole;
  }
}
