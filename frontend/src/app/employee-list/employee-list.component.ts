import { Component, Input } from '@angular/core';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent{
  @Input() roles:Role[] =[];
}
