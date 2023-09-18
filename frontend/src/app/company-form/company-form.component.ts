import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  isDetails = true;
  isLoading = false;
  isSuccess = false;
  companyForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

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
      const companyData: Company = this.companyForm.value;
      this.isDetails = false;
      this.isLoading = true;
      this.isSuccess =  false;
      // Do something with the submitted form data
      console.log(companyData);
    }
  }

  onOKButtonClicked() {
    this.isDetails = true;
    this.isLoading = false;
    this.isSuccess = false;
    this.companyForm.reset();
  }
}
