import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3NDY1MTIxLCJpYXQiOjE3MzczNjQzMjEsImp0aSI6IjQ1MDlmNzM3ODEwMTRhMjA4Y2ZiMTY2NWVjZTQzYjA4IiwidXNlcl9pZCI6OX0.o5wzt2mj1jfvZlYO-oVql3TemnOW5Jc3e8-S2C5_Sus';


  constructor(private http: HttpClient) { }

  getAllPlots(){

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    }
    return this.http.get('https://alpha-backend.aicuflow.com/visualization/user-plot?project_id=5&show_fig=True&cursor=0&limit=4', header  
  );
}

  createPlot(data: any){

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    }
    return this.http.post('https://alpha-backend.aicuflow.com/visualization/user-plot/?file_id=9 &store_in_SelectedPlot=True&show_fig=True', header  
  );
  }

  updatePlot(data: any){

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    }
    return this.http.put('https://alpha-backend.aicuflow.com/visualization/user-plot/17/', header, data  
  );
  }

  deletePlot(data: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    }
    let options = {
      header,
      body: data
    }
    
    return this.http.delete('https://alpha-backend.aicuflow.com/visualization/user-plot/17/', options
  );
  }

}

  
  
  

