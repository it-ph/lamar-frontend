import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcasterService {
  private subject = new Subject<any>();
 
    sendMessage(sen:any, rec: any, da: any) {
        this.subject.next({
          sender: sen,
          receiver: rec,
          data: da 
        });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}