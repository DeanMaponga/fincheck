import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './models/company.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  companies: Company[] = [];
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.fetchCompanies();
  }
  
  fetchCompanies() {

    this.http.get<Company[]>('http://localhost:8000/getCompanies/?format=json')
    .subscribe(
      (data) => {
        this.companies = data;
        console.log(this.companies[0].name);
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }
}
