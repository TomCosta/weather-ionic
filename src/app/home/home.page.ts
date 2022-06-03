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
  dataWeather;
  weatherIcon;
  segmentStatus: string = 'min';

  constructor(
    private setServ: WeatherServiceService,
    private apiServ: ApiWeatherService
  ){    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: ');
    this.getSettings();
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    
  }

  getSettings() {
    let weather = JSON.parse(this.setServ.getSettings());
    if(weather) {
      this.city = weather.city; 
      this.country = weather.country;
      this.getWeather(this.city, this.country);
    }
  }

  getWeather(city, country) {
    try {      
      this.apiServ.getWeather(city, country).subscribe((resp)=>{
        console.log('Weather: ', resp);
        this.weatherIcon = 'http://openweathermap.org/img/w/' + resp['weather'][0].icon + '.png';
        this.dataWeather = resp;
      });
    } catch (error) {
      console.log('Erro: ', error);
    }
  }

  segmentChanged(event) {
    this.segmentStatus = event.detail.value;
  }

  ionViewDidLeave() {
    this.city = '';
    this.country = '';
  }
}
