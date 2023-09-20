import { Component, OnInit } from '@angular/core';
import { Company } from '../models/company.model';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  isLoading = true;
  searchQuery = '';
  companies:Company[] =[];
  constructor(private router: Router,private apiService: APIService) {}

  ngOnInit(): void {
    this.apiService.getCompanies()
    .then((results) => {
      this.isLoading = false;
      this.companies = results.data.reverse();
    })
    .catch((error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  
  searchCompanies() {
    this.isLoading = true;
    this.apiService.searchCompany({"name":this.searchQuery})
    .then((results) => {
      this.isLoading = false;
      this.companies = results.data;
    })
    .catch((error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  addCompany(){
    this.apiService.currentTab = 'add-company';
    this.router.navigate([`/add-company`]);
  }
}
