import { WeatherServiceService } from '../services/weather/weather-service.service';
import { ApiWeatherService } from '../services/api/api-weather.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  city;
  country;

  constructor(
    private setServ: WeatherServiceService,
    private apiServ: ApiWeatherService
  ){    
    this.getSettings();
  }

  ngAfterViewInit(): void {
    this.getWeather();
  }

  ngOnInit() {
    console.log('ngOnInit: ');
  }

  getSettings() {
    let weather = JSON.parse(this.setServ.getSettings());
    this.city = weather.city; 
    this.country= weather.country;
  }

  getWeather() {
    try {
      this.apiServ.getWeather(this.city, this.country).subscribe((resp)=>{
        console.log('Weather: ', resp);
      });
    } catch (error) {
      console.log('Erro: ', error);
    }
  }
}
