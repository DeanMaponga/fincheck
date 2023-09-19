import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { Employee } from '../models/employee.model';
import { Role } from '../models/role.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit{
  title = "Advanced Employee Search";
  successMsg = "Search resulsts";
  errorMsg = "Unable to search";
  roleForm: FormGroup;
  isDetails = true;
  isLoading = false;
  isSuccess = false;
  isError = false;
  constructor(private router: Router,private formBuilder: FormBuilder,private apiService: APIService,private datePipe: DatePipe) {
    apiService.employeeSearchResults=[];
    this.roleForm = this.formBuilder.group({
      name: ['',[]],
      employer: ['',[]],
      department: ['',[]],
      role: ['',[]],
      start_date: ['',[]],
      end_date: ['',[]],
    });
  }
  ngOnInit(): void {
      
  }
  isDisabledForm(){
    let formControls = this.roleForm.controls;
    let isEmpty = true;
    for (let controlName in formControls) {
      if (formControls.hasOwnProperty(controlName)) {
        let control = formControls[controlName];
        if (control.value !== null && control.value !== '') {
          isEmpty = false;
          break;
        }
      }
    }
    return !this.roleForm.valid || isEmpty;
  }
  onSubmit(){
    this.isDetails = false;
    this.isLoading = true;
    this.isSuccess =false;
    this.isError = false;
    const data:any={}
    if(!!this.roleForm.value.name){
      data["name"]=this.roleForm.value.name;
    }
    if(!!this.roleForm.value.employer){
      data["employer"]=this.roleForm.value.employer;
    }
    if(!!this.roleForm.value.department){
      data["department"]=this.roleForm.value.department;
    }
    if(!!this.roleForm.value.role){
      data["role"]=this.roleForm.value.role;
    }
    if(!!this.roleForm.value.start_date){
      data["start_date"]=this.datePipe.transform(this.roleForm.value.start_date, 'yyyy');
    }
    if(!!this.roleForm.value.end_date){
      data["end_date"]=this.datePipe.transform(this.roleForm.value.end_date, 'yyyy');
    }
    
    this.apiService.searchRoles(data)
      .then((results)=>{
        this.isError = false;
        this.isDetails =false;
        this.isSuccess = true;
        this.isLoading = false;
        this.apiService.employeeSearchResults = results.data;
        this.router.navigate([`/search-employee-results`]);
      })
      .catch((err)=>{
        console.error(err);
        this.isError =true;
        this.isDetails =false;
        this.isSuccess = false;
        this.isLoading = false;
      });
  }
  onOKButtonClicked() {
    if(!this.isError){
      this.roleForm.reset();
    }
    this.isError = false;
    this.isDetails = true;
    this.isLoading = false;
    this.isSuccess = false;
    // Reset the form
  }
}
