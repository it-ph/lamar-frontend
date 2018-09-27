import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import {map} from 'rxjs/operators';

import * as SockJS from 'sockjs-client';
import * as Stomp from  '@stomp/stompjs';
import { listener } from '@angular/core/src/render3/instructions';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

  private socket: any;
  private stompClient: any;
  subject: BehaviorSubject<any>;
  private connected: boolean;

  constructor() { 
    this.initialize();
  }

  
  private initialize(){
    this.subject = new BehaviorSubject<any>(null);
    this.socket = new SockJS('/lamar-socket');
    this.stompClient = Stomp.over(this.socket);
    // this.stompClient.debug = null;
    this.stompClient
        .connect({},
          (frame)=>{ 
           if(frame.command ==='CONNECTED'){
              this.connected = true;
            }
            this.stompClient.subscribe(
              '/user-update/status',
               (data)=>{
                 let msg = JSON.parse(data.body);
                 this.subject.next(msg);
               }
            );
          },
          ()=>{
            //reinitialize/reconnect when finished or disconnected ?
            this.initialize();
          }
        );
  }
  sendMessage(msg:any){

    if(this.connected){
      this.stompClient.send('/app/user-status',{priority:9},JSON.stringify(msg));
    }
  }


}
