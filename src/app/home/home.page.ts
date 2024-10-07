import { WeatherServiceService } from '../services/weather/weather-service.service';
import { ApiWeatherService } from '../services/api/api-weather.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SingService } from '../services/singleton/sing.service';
import { NetworkServiceService } from '../services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @Input() dataToClima: string;
  
  city;
  country;
  dataWeather;
  weatherIcon;
  segmentStatus: string = 'min';
  temp: string;
  mySeg;
  title = 'Weather App';
  location = {
    city: '', 
    country: ''
  }

  constructor(
    private setServ: WeatherServiceService,
    private apiServ: ApiWeatherService,
    private singleServ: SingService
  ){
    this.getTempValue();  
    console.log('Recebido: ', this.dataToClima);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter: ');
    this.getSettings();
    this.getFlow();
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    
  }

  getFlow() {
    let seg = localStorage.getItem('tabFlow');
    if (seg) {
      this.mySeg = seg;
    } else {
      this.mySeg = 'hum';
    }
  }

  getTempValue(){
    this.singleServ.getTemp().subscribe((res)=>{
      this.temp = res;
      console.log('Temp: ', this.temp);
    })
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
      this.apiServ.getWeather(city, country).subscribe((resp) => {
        console.log('Weather: ', resp);
        this.weatherIcon = 'http://openweathermap.org/img/w/' + resp['weather'][0].icon + '.png';
        this.dataWeather = resp;
        if(resp['main']['temp']){
          this.singleServ.setTemp(resp);
        }
      });
    } catch (error) {
      console.log('Erro: ', error);
    }
  }

  // segmentChanged(event) {
  //   this.segmentStatus = event.detail.value;
  // }

  segmentChanged(mySeg) {  
    localStorage.setItem('mySegment', mySeg);
  }

  ionViewDidLeave() {
    this.city = '';
    this.country = '';
  }
}
