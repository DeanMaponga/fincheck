import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-company-file',
  templateUrl: './company-file.component.html',
  styleUrls: ['./company-file.component.scss']
})
export class CompanyFileComponent {
  @ViewChild('fileInput') fileInput: any;
  openFile() {
    this.fileInput.nativeElement.click();
  }
  handleFileInput(files: FileList) {
    console.log(files);
    /*const file = files?.item(0);
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      const jsonData = this.convertCsvToJson(fileContent);
      console.log(jsonData);
    };
    reader.readAsText(file);*/
  }

  convertCsvToJson(csvText: string) {
    // Parse the CSV text and convert it to JSON
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const jsonData = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const entry:any = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      jsonData.push(entry);
    }
    return jsonData;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent: string = e.target.result;
      const jsonData = this.parseFileContent(fileContent);
      console.log(jsonData);
    };

    reader.readAsText(file);
  }

  parseFileContent(content: string) {
    const jsonData = {}
    return jsonData;
  }

  onSubmit(){

  }
}
