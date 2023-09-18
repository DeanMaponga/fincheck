import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from './services/api.service';
import { Company } from './models/company.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  
  constructor(private router: Router,private apiService:APIService) {}
  
  ngOnInit() {}

  currentPage(){
    return this.apiService.currentTab;
  }
  changePage(page: string) {
    this.apiService.currentTab = page;
    this.router.navigate([`/${page}`]);
  }

  testAPI(){
    const testData ={
      "id":null,
      "name":"Tonde's",
      "date_of_registration":"2023-09-03",
      "registration_number":"123",
      "address":"Harare CBD",
      "contact_person":"Tonderai",
      "departments":"Deep lab",
      "number_of_employees":100,
      "contact_phone":"0772118466",
      "email":"tonde@gmail.com"
    };
    const company:Company={
      id:testData["id"],
      name:testData["name"],
      date_of_registration:testData["date_of_registration"],
      registration_number:testData["registration_number"],
      address:testData["address"],
      contact_person:testData['contact_person'],
      departments:testData['departments'],
      number_of_employees:testData['number_of_employees'],
      contact_phone:testData['contact_phone'],
      email:testData['email']
    }
    this.apiService.testAPI(company)
    .then((results)=>{
      console.log("results")
      console.log(results);

    })
    .catch((err)=>{console.log(err);
      if(Object.keys(err["error"]).includes("details")){
        console.log(err["error"]["details"])
      }
    });
  }
}
