import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  company = {
    name: '',
    employees: []
  };

  onSubmit(form: NgForm) {
    // Here, you can handle the form submission and add the company to the list of companies
    console.log(this.company);
    form.reset();
  }

}
