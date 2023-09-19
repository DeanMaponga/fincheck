import { Component, Inject } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { Company } from '../models/company.model';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-company-file',
  templateUrl: './company-file.component.html',
  styleUrls: ['./company-file.component.scss']
})
export class CompanyFileComponent {
  isLoading = false;
  isDetails = true;
  isSuccess = false;
  isError = false;
  errorMsg = "";
  companies:Company[] =[];
  constructor(public dialog: MatDialog,private apiService:APIService) { }
  openDialog(): void {
    const dialogRef = this.dialog.open(FileDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch(result["fileType"]){
          case "csv":{
            this.companies = this.processCSV(result["data"]);
            break;
          }
          case "txt":{
            this.companies = this.processCSV(result["data"]);
            break;
          }
          case "excel":{
            this.companies = this.processExcel(result);
            break;
          }
        }
      }
    });
  }

  processCSV(csvData: string): Company[] {
    const lines = csvData.split('\n');
    const result: Company[] = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      const company: Company = {
        id: null,
        name: currentLine[0],
        date_of_registration: currentLine[1],
        registration_number: currentLine[2],
        address: currentLine[3],
        contact_person: currentLine[4],
        departments: currentLine[5],
        number_of_employees: parseInt(currentLine[6]),
        contact_phone: currentLine[7],
        email: currentLine[8]
      };
      result.push(company);
    }
    return result;
  }

  processExcel(data:any){
    return [];
  }

  cantSubmit(){
    return this.companies.length===0 || this.isLoading;
  }

  onSubmit(){
    this.isLoading = false;
    this.isDetails = false;
    this.isSuccess = false;
    this.isError = false;
    
    this.apiService.addCompanies(this.companies)
      .then((results)=>{
        this.isDetails = false;
        this.isLoading = false;
        this.isSuccess =  true;
        this.isError =false;
        console.log(results);
      })
      .catch((err)=>{console.log(err);
        this.isDetails = false;
        this.isLoading = false;
        this.isSuccess =  false;
        this.isError = true;
        this.errorMsg ="An error occured, make sure phone has 10 characters, email is valid and number of employees is integer";
        if(Object.keys(err["error"]).includes("details")){
          this.errorMsg = err["error"]["details"];
          console.log(this.errorMsg)
        }
      });
  }

  onOKButtonClicked() {
    if(this.isSuccess){
      this.companies = [];
    }

    this.isDetails = true;
    this.isError = false;
    this.isLoading = false;
    this.isSuccess = false;
  }
}
