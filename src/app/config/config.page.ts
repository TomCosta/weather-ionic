import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../services/weather/weather-service.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  dataWeather;

  constructor(
    private weatherServ: WeatherServiceService
  ){
  }

  ngOnInit() {
    this.setConfig();
    this.getConfig();
  }

  setConfig(data?) {
    let temp = '90º'
    this.weatherServ.settings(temp);
  }

  getConfig(){
    this.dataWeather = this.weatherServ.getSettings();
    console.log('Weather: ', this.dataWeather);
  }
}
