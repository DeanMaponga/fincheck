import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { APIService } from '../services/api.service';
import { Company } from '../models/company.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Role } from '../models/role.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit{
  isLoading = true;
  searchQuery = '';
  roles: Role[]=[];
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
  companyId: string|undefined;
  constructor(private apiService: APIService,private route: ActivatedRoute,private router: Router) {}
  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.companyId = idParam;
      this.isLoading = true;
      this.apiService.searchCompany({"id":idParam})
      .then((results) => {
        this.isLoading = false;
        this.company = results.data[0];
        return this.apiService.getCompanyRoles({"company_id":idParam});
      })
      .then((results) => {
        this.isLoading = false;
        this.roles = results.data;
        if(this.roles.length>0){
          this.company = this.roles[0].employee.company;
        }
      })
      .catch(
        (error) => {
          console.error('Error fetching companies:', error);
        }
      );
    }
  }

  searchRoles() {
    this.isLoading = true;
    this.apiService.getCompanyRoles({"name":this.searchQuery,"company_id":this.companyId})
    .then((results) => {
      this.isLoading = false;
      this.roles = results.data;
    })
    .catch((error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addEmployee(){
    this.apiService.tempCompany=this.company;
    this.router.navigate([`/company/${this.companyId}/newEmployee`]);
  }
  
  updateCompany(): void {
    if (this.company?.id !== null) {
      this.apiService.tempCompany = this.company;
      this.router.navigate([`company/${this.company.id}/update`]);
    }
  }
}
