import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent {
  fileData: string="";
  returnData ={}

  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.fileData = reader.result as string;
      if(file.name.includes(".csv")){
        this.returnData={"fileType":"csv","filename":file.name,"data":this.fileData};
      }
      else if(file.name.includes(".txt")){
        this.returnData={"fileType":"txt","filename":file.name,"data":this.fileData};
      }
      else if(file.name.includes(".xlsx")){
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
        console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1,range:1 }))
        const csvData:string = XLSX.utils.sheet_to_csv(worksheet);
        console.log(csvData);
        this.returnData={"fileType":"excel","filename":file.name};
      }
    };
    reader.readAsText(file);
  
  }
}
