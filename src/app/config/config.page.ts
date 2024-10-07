import { WeatherServiceService } from '../services/weather/weather-service.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { SingService } from '../services/singleton/sing.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  city;
  country = 'BR';
  temp: string;
  dataWeather;
  counter;

  constructor(
    private weatherServ: WeatherServiceService,
    private singleServ: SingService
  ){
    this.getTempValue();  
    this.getConfig();
  }

  ngOnInit() {
    setInterval(() => {
      this.counter = Math.floor(Math.random() * 101)
    }, 1000);
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

  getTempValue(){
    this.singleServ.getTemp().subscribe((res)=>{
      this.temp = res;
    })
  }
}
