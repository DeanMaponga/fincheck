import { Component,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { Company } from '../models/company.model';
import { Role } from '../models/role.model';
import { APIService } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  isDetails = true;
  isLoading = false;
  isSuccess = false;
  isUpdate = false;
  isError = false;
  title ="";
  successMsg = "";
  errorMsg = "";
  company:Company|undefined;
  employee:Employee|undefined;
  @Input()role:Role|undefined;

  employeeForm: FormGroup;
  date: Date = new Date();
  formattedDate: string="";

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private apiService: APIService,private datePipe: DatePipe) {
    this.employeeForm = this.formBuilder.group({
      id:[null],
      name: ['', Validators.required],
      employee_id: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      duties: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.company = this.apiService.tempCompany;
    
    if(this.role!=undefined){
      this.isUpdate = this.role.id!=null;
      this.employee = this.role.employee;
      this.company = this.role.employee.company;
      this.company = this.employee.company;
      this.employeeForm = this.formBuilder.group({
        name: [this.employee.name, Validators.required],
        employee_id: [this.employee.employee_id, Validators.required],
        department: [this.employee.department, Validators.required],
        role: [this.role?.role, Validators.required],
        start_date: [this.role?.start_date, Validators.required],
        end_date: [this.role?.end_date],
        duties: [this.role?.duties, Validators.required]
      });
    }
    this.title = this.isUpdate?"Update Employee":"Add Employee";
    this.errorMsg = this.isUpdate?"Uanble to update Employee":"Unable to add Employee";
    this.successMsg = this.isUpdate?"Employee updated successfully!":"Employee added successfully!";
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const newCompany:Company={
        id: null,
        name: "",
        date_of_registration: "",
        registration_number: "",
        address: "",
        contact_person: "",
        departments: "",
        number_of_employees: 0,
        contact_phone: "",
        email: "",
      };
      const employee: Employee = {
        id:null,
        name: this.employeeForm.value.name,
        employee_id: this.employeeForm.value.employee_id,
        company: this.company!=undefined?this.company:newCompany,
        department: this.employeeForm.value.department,
      };
      let tempStart = this.datePipe.transform(this.employeeForm.value.start_date, 'yyyy-MM-dd');
      const role:Role={
        id:null,
        role:this.employeeForm.value.role,
        start_date: tempStart!=null?tempStart:"",
        end_date:this.datePipe.transform(this.employeeForm.value.end_date, 'yyyy-MM-dd'),
        duties:this.employeeForm.value.duties,
        employee:employee
      };
      
      this.isError = false;
      this.isDetails =false;
      this.isSuccess = false;
      this.isLoading = true;
      
      this.callAPI(role)
      .then((results)=>{
        this.isError = false;
        this.isDetails =false;
        this.isSuccess = true;
        this.isLoading = false;
      })
      .catch((err)=>{
        console.error(err);
        this.isError =true;
        this.isDetails =false;
        this.isSuccess = false;
        this.isLoading = false;
      });
    }
  }

  callAPI(role:Role){
    return this.isUpdate?this.apiService.updateRole(role):this.apiService.addRole(role);
  }

  onOKButtonClicked() {
    // Reset the form
    if(!this.isError){
      this.employeeForm.reset();
    }
    this.isError = false;
    this.isDetails = true;
    this.isLoading = false;
    this.isSuccess = false;
  }
}