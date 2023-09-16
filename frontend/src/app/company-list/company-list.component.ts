import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  companies = [
    { id: 1, name: 'Company 1', employees: ['Employee 1', 'Employee 2'] },
    { id: 2, name: 'Company 2', employees: ['Employee 3', 'Employee 4'] }
  ];
  searchTerm = '';

  filteredCompanies() {
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
