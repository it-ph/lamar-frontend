import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CookieService } from 'ngx-cookie-service';
import { BroadcasterService } from './services/broadcaster.service';
import { StompService, StompConfig } from '@stomp/ng2-stompjs';
import { UserPipe } from './pipes/user.pipe';
import { AdPipe } from './pipes/ad.pipe';
import { AdAssignment } from './model/ad-assignment';
import { AdAssignmentPipe } from './pipes/ad-assignment.pipe';
import { RequestInterceptor } from './request-interceptor';
import { RoutingPipe } from './pipes/routing.pipe';

import * as SockJS from 'sockjs-client';
import { MessagingService } from './services/messaging.service';
import { FileSaverService } from './services/file-saver.service';
import { AuditorComponent } from './layout/auditor/auditor.component';
import { DispatchedPipe } from './pipes/dispatched.pipe';
import { WebsocketService } from './services/websocket.service';

// const stompConfig: StompConfig = {
//                     url: new SockJS('/lamar-socket') ,
//                     headers: {},
//                     heartbeat_in: 0, 
//                     heartbeat_out: 20000,
//                     reconnect_delay: 3000,
//                     debug: true
//                   };

@NgModule({
  declarations: [
    AppComponent,
    DispatchedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgSelectModule

  ],
  providers: [
    CookieService,
    UserPipe,
    AdPipe,
    AdAssignmentPipe,
    RoutingPipe,
    DispatchedPipe,
    StompService,
    FileSaverService,
    MessagingService,
    WebsocketService,
    // { 
    //   provide: StompConfig, 
    //   useValue:  {
    //     url: new SockJS('/lamar-socket') ,
    //     headers: {},
    //     heartbeat_in: 0, 
    //     heartbeat_out: 0,
    //     reconnect_delay: 2000,
    //     debug: true
    //   }
    // },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
