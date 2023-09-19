import { Component,Input, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent implements OnInit{
  
  company:Company|Company={
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
  constructor(private apiService:APIService){}
  ngOnInit(): void {
      this.company = this.apiService.tempCompany;
  }
}
