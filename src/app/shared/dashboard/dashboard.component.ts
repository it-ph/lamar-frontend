import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { User } from '../../model/user';
import { ModalDirective } from 'ngx-bootstrap';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { AccessService } from '../../services/access.service';
import { Subscription, Observable } from 'rxjs';

import { MessagingService } from '../../services/messaging.service';
import { StompService } from '@stomp/ng2-stompjs';
import { ComponentMessage } from '../../model/component-message';


import * as SockJS from 'sockjs-client';
import * as Stomp from  '@stomp/stompjs';
import { WebsocketService } from '../../services/websocket.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ AdService, 
               UserService 
              ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('order_detail')
  order_detail: ModalDirective

  @ViewChild('assign_member')
  assign_member: ModalDirective

  currentUser: User;

  subscribed: boolean;

  messages: Observable<any>;
  subscription: Subscription;
  msgSubscription: Subscription;

  constructor(private accessService: AccessService,
              // private stompService: StompService,
              private websocketService: WebsocketService,
              private msgService: MessagingService,
              private changeRef: ChangeDetectorRef) {
                 
  }

  ngOnInit() {    
   // this.initWebsocket();
    this.currentUser = this.accessService.getCurrentUser();
   // this.messages = this.websocketService.subscribe('/user-update/status')
    this.subscribe();
    this.websocketService
        .subject
        .subscribe(
          (data)=>{
            console.log(data);
            if(data){
              
              if(data.sender.id !==this.currentUser.id){
                this.msgService.sendData(data);
              }
            }
          }
        );
  }
  ngOnDestroy() {
    this.unSubscribe();
    this.changeRef.detach();
  }
  private initWebsocket(){
    let socket = new SockJS('/lamar-socket');
    let stompClient = Stomp.over(socket);

    stompClient.connect({},
    (frame)=>{
      console.log(frame);
    })
  }
  
  sendMessage(){
    this.websocketService.sendMessage({message:'test'});
  }
  private subscribe(){
    //if already subscribe return
    if(this.subscribed){
      return;
    }

    // this.messages = this.stompService.subscribe('/user-update/status');
    this.subscribed = true;
    //When a message is received from websocket broadcast the message to other component
    // this.subscription = this.messages
    //                         .subscribe(
    //                           (message:any)=>{
    //                             let data:ComponentMessage = JSON.parse(message.body);
                               
    //                             if(data.sender.id !==this.currentUser.id){
    //                               this.msgService.sendData(data);
    //                             }
    //                           }
    //                         );
    
  }

  /** UnSubscribe to prevent memory leaks onNgDestroy */
  private unSubscribe(){
    if (!this.subscribed) {
      return;
    }

    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
  //  this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;
    this.subscribed = false;

  }


 

  /**Event handler when an update on a queue occurs */
  onQueueUpdate(event:any){
    //broadcast to all receipients the event
  //  this.sendMessage(event);
    let message:ComponentMessage ={
      data: event,
      sender: this.currentUser,
      component: 'Dashboard'
    };
    this.websocketService.sendMessage(message);
  //  this.stompService.publish('/app/user-status',JSON.stringify(message));
   this.msgService.sendData(message);
  }

}
