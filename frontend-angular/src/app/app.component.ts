import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-angular';

  apiResponse: any = null;
  apiHeaders: any = null;
  apiUrl: string = 'https://jsonplaceholder.typicode.com/users/1';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('App component initialized');
    this.fetchData();
  }

  async fetchData() {
    try {
      const response: any = await this.http.get(this.apiUrl, { observe: 'response' }).toPromise();
      console.log(response);
      this.apiResponse = response.body;
      this.apiHeaders = response.headers;
    } catch (error) {
      console.error('Error fetching data:', error);
      this.apiResponse = error
      this.apiHeaders = null;
    }
  }

  onSubmit(form: any) {
    form.preventDefault();
    this.fetchData();
  }
}
