import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  @Input() role:Role|undefined;
  constructor(private router: Router,private apiService:APIService) {}
  navigateToEmployee(){
    if(this.role!=undefined && this.role.id!=null){
      this.apiService.tempRole =this.role;
      this.router.navigate(['employee/', this.role.employee?.id]);
    }
  }
}
