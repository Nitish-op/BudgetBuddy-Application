import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ExpressdbService } from '../services/expressdb.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadbills',
  templateUrl: './uploadbills.component.html',
  styleUrl: './uploadbills.component.css'
})
export class UploadbillsComponent {
  data:any;result:any;
  constructor(private service:ExpressdbService){}

  onFileChange(event: any): void {
    const file = event.target.files[0];
  
    if (file) {
      this.readExcel(file);
    }
  }
  readExcel(file: File): void {
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      // Assuming the first row in Excel contains column headers
      const headers = jsonData[0] as string[]; // Use type assertion here
  
      // Remove the headers row and convert the data to JSON
      const jsonDataWithoutHeaders = jsonData.slice(1);
  
      let convertedData = jsonDataWithoutHeaders.map((row: any) => {
        const rowData: any = {};
        headers.forEach((header: string, index: number) => {
          if (header === 'date') {
            // Convert Excel serial number to a readable date format
            rowData[header] = XLSX.SSF.format('YYYY-MM-DD', row[index]);
          } else {
            rowData[header] = row[index];
          }
        });
        return rowData;
      });
  
      console.log('Converted JSON data:', convertedData);
       

      this.service.uploadBill(convertedData).subscribe((res)=>{
          this.result=res;
        if(this.result.message=="uploaded")
        {
          Swal.fire({
          title: "Successfully uploaded",
          icon: "success"
        });
      }
        else{
          alert("something went wrong")
        }

      })

    };
  
    reader.readAsArrayBuffer(file);
  }
  
}
