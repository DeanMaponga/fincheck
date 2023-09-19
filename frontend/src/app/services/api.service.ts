import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/company.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  //temp variables
  tempCompany:Company={
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
  tempRole:Role|undefined;
  employeeSearchResults:Role[]=[];
  currentTab: string = 'add-company';
  private apiUrl = 'http://18.191.1.123:8000/';//'http://localhost:8000/';
  apiKey = 'testKey';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    })
  };

  constructor(private http: HttpClient) { }

  getCompanies(): Promise<any> {
    const url = `${this.apiUrl}getCompanies/`; 
    return this.http.get(url,this.httpOptions).toPromise();
  }

  addCompany(data:any):Promise<any>{
    const url = `${this.apiUrl}addCompany/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  updateCompany(data:any):Promise<any>{
    const url = `${this.apiUrl}updateCompany/`; 
    return this.http.patch(url,data,this.httpOptions).toPromise();
  }

  addCompanies(data:any):Promise<any>{
    const url = `${this.apiUrl}addCompanies/`; 
    console.log(url);
    return this.http.post(url,data,this.httpOptions).toPromise();
  }
  
  searchCompany(data:any):Promise<any>{
    const url = `${this.apiUrl}searchCompany/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  getEmployees():Promise<any>{
    const url = `${this.apiUrl}getEmployees/`;
    return this.http.get(url,this.httpOptions).toPromise();
  }

  getRoles():Promise<any>{
    const url = `${this.apiUrl}getRoles/`;
    console.log(url);
    return this.http.get(url,this.httpOptions).toPromise();
  }

  searchRole(data:any):Promise<any>{
    const url = `${this.apiUrl}searchRole/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  searchEmployee(data:any):Promise<any>{
    const url = `${this.apiUrl}searchEmployee/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  getCompanyEmployees(data:any):Promise<any>{
    const url = `${this.apiUrl}getCompanyEmployees/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  addRole(data:any):Promise<any>{
    const url = `${this.apiUrl}addRole/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  addRoles(data:any):Promise<any>{
    const url = `${this.apiUrl}addRoles/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }
  updateRole(data:any):Promise<any>{
    const url = `${this.apiUrl}updateRole/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  searchRoles(data:any):Promise<any>{
    const url = `${this.apiUrl}searchRoles/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  getCompanyRoles(data:any):Promise<any>{
    const url = `${this.apiUrl}getCompanyRoles/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }

  testAPI(data:any):Promise<any>{
    const url = `${this.apiUrl}testAPI/`; 
    return this.http.post(url,data,this.httpOptions).toPromise();
  }
}
