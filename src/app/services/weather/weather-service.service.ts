import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor() {

  }

  settings(city, country){
    let weatherObject = {
      city: city,
      country: country
    }
    console.log('weatherObject: ', weatherObject);
    localStorage.setItem('dataWeather', JSON.stringify(weatherObject));
  }

  getSettings(){
    return localStorage.getItem('dataWeather');
  }
}
