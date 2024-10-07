import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingService {

  private climaTempSub: BehaviorSubject<string>;

  constructor() {
    this.climaTempSub = new BehaviorSubject<string>('');
  }

  setTemp(temp) {
    this.climaTempSub.next(temp);
  }

  getTemp(): Observable<string> {
    return this.climaTempSub;
  }
}
