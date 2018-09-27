import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { ComponentMessage } from "../model/component-message";
@Injectable()
export class MessagingService {

    private subject = new Subject<any>();
 
    sendData(msg: ComponentMessage) {
        this.subject.next(msg);
    }

    clearDatae() {
        this.subject.next();
    }

    getData(): Observable<ComponentMessage> {
        return this.subject.asObservable();
    }

 
}