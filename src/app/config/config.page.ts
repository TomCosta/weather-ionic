import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../services/weather/weather-service.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  city;
  country = 'BR';
  dataWeather;

  constructor(
    private weatherServ: WeatherServiceService
  ){
    this.getConfig();
  }

  ngOnInit() {

  }

  setConfig() {
    this.weatherServ.settings(this.city, this.country);
  }

  getConfig(){
    this.dataWeather = JSON.parse(this.weatherServ.getSettings());
    if(this.dataWeather){
      this.city = this.dataWeather.city;
      this.country = this.dataWeather.country;
    }
  }
}
