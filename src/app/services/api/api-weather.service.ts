import { NetworkServiceService } from 'src/app/services/network.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'e659687d5c33ddd16b00b2d17ba201e4';
@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {  

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'application/json'      
    }),
    'responseType': 'text' as 'json'
  };
  network;

  constructor(
    private netServ: NetworkServiceService,
    private myHttp: HttpClient
  ){
    this.network = this.netServ.checkNetwork();
  }

  getWeather(city, country) {
    let data = {
      city: city,
      country: country
    }
    if(this.network==='Offline') {
      this.saveOffline(data) 
      return;
    }
    return this.myHttp.get(urlBase + city +',' + country + '&lang=pt&units=metric&appid='+ apiKey)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  saveOffline(data) {
    let offlineWeather = {
      city: data.city,
      country: data.country
    }
    console.log('offlineWeather: ', offlineWeather);
    localStorage.setItem('offlineWeather', JSON.stringify(offlineWeather));
  }

  recoverOffline() {
    return localStorage.getItem('offlineWeather');
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
