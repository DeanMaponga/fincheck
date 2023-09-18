import { Component} from '@angular/core';
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
  company:Company={
    address: "",
    id: 0,
    name: '',
    date_of_registration: '',
    registration_number: '',
    contact_person: '',
    departments: '',
    number_of_employees: 0,
    contact_phone: '',
    email: ''
  };
  employeeForm: FormGroup;
  companyJson = "";
  date: Date = new Date();
  formattedDate: string="";

  

  

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private apiService: APIService,private datePipe: DatePipe) {
    this.employeeForm = this.formBuilder.group({
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
    this.route.queryParams.subscribe(params => {
      this.companyJson = params['company'];
      this.company = JSON.parse(this.companyJson);
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        name: this.employeeForm.value.name,
        employee_id: this.employeeForm.value.employee_id,
        company: this.company,
        department: this.employeeForm.value.department,
      };
      let tempStart = this.datePipe.transform(this.employeeForm.value.start_date, 'yyyy-MM-dd');
      const role:Role={
        role:this.employeeForm.value.role,
        start_date: tempStart!=null?tempStart:"",
        end_date:this.datePipe.transform(this.employeeForm.value.end_date, 'yyyy-MM-dd'),
        duties:this.employeeForm.value.duties,
        employee:employee
      };
      this.isDetails =false;
      this.isSuccess = false;
      this.isLoading = true;
      this.apiService.addRole(role)
      .then((results)=>{
        this.isDetails =false;
        this.isSuccess = true;
        this.isLoading = false;
      })
      .catch((err)=>{
        console.error(err);
        this.isDetails =false;
        this.isSuccess = true;
        this.isLoading = false;
      });
    }
  }

  onOKButtonClicked() {
    this.isDetails = true;
    this.isLoading = false;
    this.isSuccess = false;
   // Reset the form
   this.employeeForm.reset();
  }
}