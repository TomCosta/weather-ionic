import { ApiWeatherService } from 'src/app/services/api/api-weather.service';
import { NetworkServiceService } from 'src/app/services/network.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private netServ: NetworkServiceService,
    private apiServ: ApiWeatherService,
    private router: Router
  ){
    this.recoverOffline();
  }

  recoverOffline() {
    let status = this.netServ.checkNetwork();
    let localData = this.apiServ.recoverOffline();
    if(status==='Online' && localData !== null){
      let data = {
        city: localData['city'],
        country: localData['country']
      }
      this.apiServ.getWeather(localData['city'], localData['country']);
    }
  }

  weather() {
    this.router.navigate(['home']);
  }
  
  config(){
    this.router.navigate(['config']);
  }

  info(){
    this.router.navigate(['info']);
  }

  logout() {
    console.log('Saiu...')
  }
}
