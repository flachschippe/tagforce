import { TestBed } from '@angular/core/testing';
import { environment } from './../environments/environment';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   query: string;
   iterations: string;
   graph: Object;

   constructor(private http: Http) {
    this.query = 'luhmann';
    this.iterations = '1';
    this.graph = {};
   }

   ngOnInit(){

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

  public testData() {
    this.graph = {"links": [{"source": "Soziologie", "value": 2, "target": "Systemtheorie"}, {"source": "Verwaltung", "value": 1, "target": "Organisationssoziologie"}, {"source": "Freyer, Hans", "value": 1, "target": "Gehlen, Arnold"}, {"source": "Freyer, Hans", "value": 1, "target": "Schelsky, Helmut"}, {"source": "Freyer, Hans", "value": 1, "target": "G\u00fcnther, Gotthard"}, {"source": "Freyer, Hans", "value": 1, "target": "Rezeption"}, {"source": "Freyer, Hans", "value": 1, "target": "Luhmann, Niklas"}, {"source": "Freyer, Hans", "value": 1, "target": "Handlungstheorie"}, {"source": "Freyer, Hans", "value": 1, "target": "Systemtheorie"}, {"source": "Rechtssystem", "value": 1, "target": "Luhmann, Niklas"}, {"source": "Rechtssystem", "value": 1, "target": "Strukturelle Kopplung"}, {"source": "Rechtssystem", "value": 1, "target": "Weltgesellschaft"}, {"source": "Rechtssystem", "value": 1, "target": "Recht"}, {"source": "Soziologie", "value": 1, "target": "Mensch"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Systemtheorie"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Soziales System"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Sozialarbeit"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Zitat"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Mentalit\u00e4t"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Sprechen"}, {"source": "Luhmann, Niklas", "value": 1, "target": "Organist"}], "nodes": [{"group": "1", "value": 2, "id": "Soziologie"}, {"group": "1", "value": 4, "id": "Systemtheorie"}, {"group": "1", "value": 1, "id": "Verwaltung"}, {"group": "1", "value": 1, "id": "Organisationssoziologie"}, {"group": "1", "value": 1, "id": "Freyer, Hans"}, {"group": "1", "value": 1, "id": "Gehlen, Arnold"}, {"group": "1", "value": 1, "id": "Schelsky, Helmut"}, {"group": "1", "value": 1, "id": "G\u00fcnther, Gotthard"}, {"group": "1", "value": 1, "id": "Rezeption"}, {"group": "1", "value": 4, "id": "Luhmann, Niklas"}, {"group": "1", "value": 1, "id": "Handlungstheorie"}, {"group": "1", "value": 1, "id": "Rechtssystem"}, {"group": "1", "value": 1, "id": "Strukturelle Kopplung"}, {"group": "1", "value": 1, "id": "Weltgesellschaft"}, {"group": "1", "value": 1, "id": "Recht"}, {"group": "1", "value": 1, "id": "Mensch"}, {"group": "1", "value": 1, "id": "Soziales System"}, {"group": "1", "value": 1, "id": "Sozialarbeit"}, {"group": "1", "value": 1, "id": "Zitat"}, {"group": "1", "value": 1, "id": "Mentalit\u00e4t"}, {"group": "1", "value": 1, "id": "Sprechen"}, {"group": "1", "value": 1, "id": "Organist"}]}
  }
}
