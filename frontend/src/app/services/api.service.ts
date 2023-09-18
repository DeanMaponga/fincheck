import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = 'http://localhost:8000/'; 

  constructor(private http: HttpClient) { }

  getCompanies(): Promise<any> {
    const url = `${this.apiUrl}getCompanies/`; 
    return this.http.get(url).toPromise();
  }

  addCompany(company:Company):Promise<any>{
    const url = `${this.apiUrl}addCompany`; 
    return this.http.post(url, company).toPromise();
  }
  
  searchCompany(data:any):Promise<any>{
    const url = `${this.apiUrl}searchCompany/`; 
    return this.http.post(url,data).toPromise();
  }

  getEmployees():Promise<any>{
    const url = `${this.apiUrl}getEmployees/`;
    return this.http.get(url).toPromise();
  }

  searchEmployee(data:any):Promise<any>{
    const url = `${this.apiUrl}searchEmployee/`; 
    return this.http.post(url,data).toPromise();
  }

  getCompanyEmployees(data:any):Promise<any>{
    const url = `${this.apiUrl}getCompanyEmployees/`; 
    return this.http.post(url,data).toPromise();
  }

  addRole(data:any):Promise<any>{
    const url = `${this.apiUrl}addRole/`; 
    return this.http.post(url,data).toPromise();
  }

}
