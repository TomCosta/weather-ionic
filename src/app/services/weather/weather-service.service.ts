import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor() {

  }

  settings(dataWeather){
    localStorage.setItem('dataWeather', dataWeather);
  }

  getSettings(){
    return localStorage.getItem('dataWeather');
  }
}
