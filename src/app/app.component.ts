import { environment } from './../environments/environment';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   query: string;
   iterations: string;
   graph: Object;

   constructor(private http: Http) {
    this.query = '';
    this.iterations = '0';
    this.graph = {};
   }


   public fetchData() {
    const myParams = new URLSearchParams();
    myParams.append('query', this.query);
    myParams.append('iterations', this.iterations);
    const options = new RequestOptions({ search: myParams });
    return this.http.get(environment.harvest_service_url, options).toPromise()
    .then((response) => {
      this.graph = response.json();
    });

   }
}
