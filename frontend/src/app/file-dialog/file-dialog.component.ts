import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import readXlsxFile from 'read-excel-file';

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
    if(file.name.includes(".csv")){
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileData = reader.result as string;
        this.returnData={"fileType":"csv","filename":file.name,"data":this.fileData};
      };
      reader.readAsText(file);    
    }
    else if(file.name.includes(".txt")){
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileData = reader.result as string;
        this.returnData={"fileType":"txt","filename":file.name,"data":this.fileData};
      };
      reader.readAsText(file);
    }
    else if(file.name.includes(".xlsx")){
      readXlsxFile(file)
      .then((rows) => {
        this.returnData={"fileType":"excel","filename":file.name,"data":rows};
      })
      .catch((err)=>{
        console.log(err);
        this.returnData={"fileType":"excel","filename":file.name,"error":err};
      });
    }
  }
}
