import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkServiceService {

  constructor(
    private toastController: ToastController
  ){
  }

  checkNetwork() {
    if(window.navigator.onLine) {
        this.netAlert('Online');
        return 'Online';
    } else {
        this.netAlert('Offline');
        return 'Offline';
    }
  }

  async netAlert(status) {
    const toast = await this.toastController.create({
      message: 'Internet: ' + status,
      duration: 2000,
      position: 'middle',
      cssClass: 'custom-toast',
      color: status == 'Online' ? 'success' : 'danger'
    });
    await toast.present();
  }
}
