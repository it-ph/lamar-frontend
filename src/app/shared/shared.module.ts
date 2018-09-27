
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AlertModule, BsDropdownModule, ModalModule, PaginationModule, TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersComponent } from '../users/users.component';
import { RoutingQueueComponent } from './routing-queue/routing-queue.component';
import { DevQueueComponent } from './dev-queue/dev-queue.component';
import { DpQueueComponent } from './dp-queue/dp-queue.component';
import { QaQueueComponent } from './qa-queue/qa-queue.component';
import { CompletedComponent } from './completed/completed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QueueComponent } from './queue/queue.component';
import { AdPipe } from '../pipes/ad.pipe';
import { UserPipe } from '../pipes/user.pipe';
import { AdsComponent } from './ads/ads.component';
import { AdAssignment } from '../model/ad-assignment';
import { AdAssignmentPipe } from '../pipes/ad-assignment.pipe';
import { DispatchedComponent } from './dispatched/dispatched.component';
import { RoutingPipe } from '../pipes/routing.pipe';
import { ReportComponent } from './report/report.component';
import { AuditedComponent } from './audited/audited.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlertModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgSelectModule
    ],
    declarations: [
      HeaderComponent,
      SidebarComponent,
      DashboardComponent,
      UsersComponent,
      RoutingQueueComponent,
      DevQueueComponent,
      DpQueueComponent,
      QaQueueComponent,
      CompletedComponent,
      QueueComponent,
      AdsComponent,
      AdPipe,
      UserPipe,
      AdAssignmentPipe,
      RoutingPipe,
      DispatchedComponent,
      ReportComponent,
      AuditedComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        DashboardComponent,
        UsersComponent,
        RoutingQueueComponent,
        DevQueueComponent,
        DpQueueComponent,
        QaQueueComponent,
        CompletedComponent,
        QueueComponent,
        AdsComponent,
        AdPipe,
        UserPipe
    ]
  })
export class SharedModule {}