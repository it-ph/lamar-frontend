import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy, Output, EventEmitter, ViewRef } from '@angular/core';
import { AdAssignment } from '../../model/ad-assignment';
import { Queue } from '../../model/queue';
import { ModalDirective } from 'ngx-bootstrap';
import { AdRouting } from '../../model/ad-routing';
import { TaskHistory } from '../../model/task-history';
import { RoutingService } from '../../services/routing.service';
import { User } from '../../model/user';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TaskHistoryService } from '../../services/taskhistory.service';
import { AccessService } from '../../services/access.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit, OnDestroy {

  get ads(): AdRouting[]{
      return this._ads.getValue();
  }

  _ads = new BehaviorSubject<AdRouting[]>([]);

  @Output('onUpdate')
  onUpdate = new EventEmitter();

  selectedAd: AdRouting;
  taskHistory: TaskHistory[];
  currentUser: User;



  @ViewChild('order_detail')
  order_detail: ModalDirective

  @ViewChild('order_status')
  order_status: ModalDirective
  msgSubscription: Subscription;

  loading: boolean;

  constructor(private taskHistoryService: TaskHistoryService,
              private accessService: AccessService,
              private routingService: RoutingService,
              private changeRef: ChangeDetectorRef,
              private messageService: MessagingService) { 

    
  }

  ngOnInit() {
    this.currentUser = this.accessService.getCurrentUser();
    this.taskHistory = [];
    this.selectedAd = new AdRouting();
    this.loadCompletedQueue();
    this.msgSubscription = this.messageService 
                               .getData()
                               .subscribe(()=>{ this.loadCompletedQueue(); });

  }
  ngOnDestroy(){
    this.changeRef.detach();
  }
  viewDetails(ad){
    this.selectedAd = ad;
    this.order_detail.show();
  }
  viewStatus(adRouting: AdRouting){
    this.taskHistory = adRouting.taskHistory;
    this.order_status.show();
  }
  detectChanges(){
    
    if(!(this.changeRef as ViewRef).destroyed){
        this.changeRef.detectChanges();
    }
  }
  canDispatch(){
    return this.currentUser.role.role ==='Support';
  }
  dispatchAd(adRouting: AdRouting){

    this.routingService
        .dispatchAd(adRouting)
        .subscribe(
          (res:any)=>{
            this.onUpdate.emit(adRouting);
          },
          (err: any)=>{
            console.log(err);
          }
        )
  }

  loadCompletedQueue(){
    this.routingService
        .getCompletedRouting()
        .subscribe(
          (res:AdRouting[])=>{
            this._ads.next(res);
             this.detectChanges();
          },
          (err:any)=>{
            console.log(err);
          }
        )
  }

  

}
