import { Component } from '@angular/core';
import { Role } from '../models/role.model';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../services/api.service';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { Company } from '../models/company.model';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-file',
  templateUrl: './employee-file.component.html',
  styleUrls: ['./employee-file.component.scss']
})
export class EmployeeFileComponent {
  isLoading = false;
  isDetails = true;
  isSuccess = false;
  isError = false;
  errorMsg = "";
  roles:Role[] =[];
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
            this.roles = this.processCSV(result["data"]);
            break;
          }
          case "txt":{
            this.roles = this.processCSV(result["data"]);
            break;
          }
          case "excel":{
            this.roles = this.processExcel(result);
            break;
          }
        }
      }
    });
  }

  processCSV(csvData: string): Role[] {
    const lines = csvData.split('\n');
    const result: Role[] = [];
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
      const newEmployee:Employee={
        id:null,
        name:currentLine[9],
        employee_id:currentLine[10],
        department:currentLine[11],
        company:company
      };
      const newRole:Role={
        id:null,
        role:currentLine[12],
        start_date:currentLine[13],
        end_date:currentLine[14],
        duties:currentLine[15],
        employee:newEmployee
      }
      result.push(newRole);
    }
    return result;
  }

  processExcel(data:any){
    return [];
  }

  cantSubmit(){
    return this.roles.length===0 || this.isLoading;
  }

  onSubmit(){
    this.isLoading = true;
    this.isDetails = false;
    this.isSuccess = false;
    this.isError = false;
    this.apiService.addRoles(this.roles)
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
        this.errorMsg ="An error occured, could not add data, check if file has valid data";
        if(Object.keys(err["error"]).includes("details")){
          this.errorMsg = err["error"]["details"];
          console.log(this.errorMsg)
        }
      });
  }

  onOKButtonClicked() {
    if(this.isSuccess){
      this.roles = [];
    }

    this.isDetails = true;
    this.isError = false;
    this.isLoading = false;
    this.isSuccess = false;
  }
}
