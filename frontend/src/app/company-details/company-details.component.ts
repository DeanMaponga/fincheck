import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { APIService } from '../services/api.service';
import { Company } from '../models/company.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit{
  isLoading = true;
  searchQuery = '';
  employees: Employee[]=[];
  company:Company|undefined;
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
        return this.apiService.getCompanyEmployees({"id":idParam});
      })
      .then((results) => {
        this.isLoading = false;
        this.employees = results.data;
        if(this.employees.length>0){
          this.company = this.employees[0].company;
        }
      })
      .catch(
        (error) => {
          console.error('Error fetching companies:', error);
        }
      );
    }
  }

  searchEmployees() {
    this.isLoading = true;
    this.apiService.getCompanyEmployees({"name":this.searchQuery,"id":this.companyId})
    .then((results) => {
      this.isLoading = false;
      this.employees = results.data;
    })
    .catch((error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addEmployee(){
    const companyJson = JSON.stringify(this.company);
    this.router.navigate([`/company/${this.companyId}/newEmployee`],{ queryParams: { company: companyJson }});
  }
  addEmployeesWithCSV(){}
}
