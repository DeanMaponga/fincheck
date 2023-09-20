import { Component, OnInit,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company} from '../models/company.model';
import { DatePipe } from '@angular/common';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  isUpdate = false;
  isDetails = true;
  isLoading = false;
  isSuccess = false;
  isError = false;
  errorMsg ="";
  successMsg =""
  title="";
  @Input() company:Company|Company={
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
  
  companyForm: FormGroup = new FormGroup({});

  constructor(private router: Router,private apiService: APIService,private formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit() {
    this.isUpdate = this.company.id!=null;
    this.companyForm = this.formBuilder.group({
      id: [this.company.id],
      name: [this.company.name, Validators.required],
      date_of_registration: [this.company.date_of_registration, Validators.required],
      registration_number: [this.company.registration_number, Validators.required],
      address: [this.company.address, Validators.required],
      contact_person: [this.company.contact_person, Validators.required],
      departments: [this.company.departments, Validators.required],
      number_of_employees: [this.company.number_of_employees, Validators.required],
      contact_phone: [this.company.contact_phone, Validators.required],
      email: [this.company.email, [Validators.required, Validators.email]]
    });
    this.title = this.isUpdate?"Update Company":"Add Company";
    this.successMsg = this.isUpdate?"Company updated successfully!":"Company added successfully!";
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.errorMsg = "";
      this.isDetails = false;
      this.isLoading = true;
      this.isError = false;
      this.isSuccess =  false;
      this.company.name =this.companyForm.value.name;
      this.company.date_of_registration = this.companyForm.value.date_of_registration;
      this.company.registration_number=this.companyForm.value.registration_number;
      this.company.address=this.companyForm.value.address;
      this.company.contact_person=this.companyForm.value.contact_person;
      this.company.departments=this.companyForm.value.departments;
      this.company.number_of_employees=parseInt(this.companyForm.value.number_of_employees);
      this.company.contact_phone=this.companyForm.value.contact_phone;
      this.company.email=this.companyForm.value.email;
      
      let tempDate = this.datePipe.transform(this.companyForm.value.date_of_registration, 'yyyy-MM-dd');
      if(tempDate!=null){
        this.company.date_of_registration = tempDate;
      }
      
      this.callAPI()
      .then((results)=>{
        this.isDetails = false;
        this.isLoading = false;
        this.isSuccess =  true;
        this.isError =false;
        console.log(results);
      })
      .catch((err)=>{console.log(err);
        this.isDetails = false;
        this.isLoading = false;
        this.isSuccess =  false;
        this.isError = true;
        this.errorMsg ="An error occured, make sure phone has 10 characters, email is valid and number of employees is integer";
        if(Object.keys(err["error"]).includes("details")){
          this.errorMsg = err["error"]["details"];
          console.log(this.errorMsg)
        }
      });
    }
  }

  callAPI(){
    return  this.isUpdate?this.apiService.updateCompany(this.company):this.apiService.addCompany(this.company);    
  }
  
  onOKButtonClicked() {
    if(this.isSuccess && !this.isUpdate){
      this.companyForm.reset();
      this.router.navigate([`/companies`]);
    }

    this.isDetails = true;
    this.isError = false;
    this.isLoading = false;
    this.isSuccess = false;
  }
}
