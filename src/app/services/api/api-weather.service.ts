import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q=';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  key = 'e659687d5c33ddd16b00b2d17ba201e4';  

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json'      
    }),
    'responseType': 'text' as 'json'
  };

  constructor(
    private myHttp: HttpClient
  ){
  }

  getWeather(city, country){
    return this.myHttp.get(urlBase + city +',' + country + '&lang=pt&units=metric&appid='+ this.key)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Erro Código: ${error.status}\nMsg: ${error.message}`;
    }
    console.log(`Erro: `, errorMessage);
    return throwError(errorMessage);
  }
}
