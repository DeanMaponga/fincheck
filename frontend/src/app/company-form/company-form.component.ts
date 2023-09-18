import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company.model';
import { DatePipe } from '@angular/common';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  isDetails = true;
  isLoading = false;
  isSuccess = false;
  isError = false;
  errorMsg ="";
  companyForm: FormGroup = new FormGroup({});

  constructor(private apiService: APIService,private formBuilder: FormBuilder,private datePipe: DatePipe) { }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      date_of_registration: ['', Validators.required],
      registration_number: ['', Validators.required],
      address: ['', Validators.required],
      contact_person: ['', Validators.required],
      departments: ['', Validators.required],
      number_of_employees: ['', Validators.required],
      contact_phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.errorMsg = "";
      this.isDetails = false;
      this.isLoading = true;
      this.isError = false;
      this.isSuccess =  false;
      const company:Company={
        id:null,
        name:this.companyForm.value.name,
        date_of_registration:this.companyForm.value.date_of_registration,
        registration_number:this.companyForm.value.registration_number,
        address:this.companyForm.value.address,
        contact_person:this.companyForm.value.contact_person,
        departments:this.companyForm.value.departments,
        number_of_employees:parseInt(this.companyForm.value.number_of_employees),
        contact_phone:this.companyForm.value.contact_phone,
        email:this.companyForm.value.email
      }
      let tempDate = this.datePipe.transform(this.companyForm.value.date_of_registration, 'yyyy-MM-dd');
      if(tempDate!=null){
        company.date_of_registration = tempDate;
      }
      this.apiService.addCompany(company)
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

  onOKButtonClicked() {
    if(this.isSuccess){
      this.companyForm.reset();
    }

    this.isDetails = true;
    this.isError = false;
    this.isLoading = false;
    this.isSuccess = false;
  }
}
