import { Component, OnInit, Output, ViewChild,EventEmitter, Input, OnDestroy, ChangeDetectorRef, ViewRef } from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Ad } from '../../model/ad';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { BroadcasterService } from '../../services/broadcaster.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Queue } from '../../model/queue';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { AdAssignment } from '../../model/ad-assignment';
import { User } from '../../model/user';
import { AdRouting } from '../../model/ad-routing';
import { AdQuery } from '../../model/ad-query';
import { TaskHistory } from '../../model/task-history';
import { RoutingService } from '../../services/routing.service';
import { AccessService } from '../../services/access.service';
import { MessagingService } from '../../services/messaging.service';
import { ComponentMessage } from '../../model/component-message';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-qa-queue',
  templateUrl: './qa-queue.component.html',
  styleUrls: ['./qa-queue.component.css']
})
export class QaQueueComponent implements OnInit, OnDestroy {

  get ads(): AdRouting[]{
    return this._ads.getValue();
  }
  _ads:any; 

  @Output('onUpdate')
  onUpdate = new EventEmitter<any>();

  selectedAd: AdRouting;
  taskHistory: TaskHistory[];

  @ViewChild('order_detail')
  order_detail: ModalDirective

  @ViewChild('order_status')
  order_status: ModalDirective

  @ViewChild('reject_modal')
  reject_modal: ModalDirective

  queue: Queue;

  msgSubscription: Subscription;
  currentUser: User;
  loading: boolean;

  rejectForm: FormGroup;

  constructor(private routingService: RoutingService,
              private accesService: AccessService,
              private messageService: MessagingService,
              private formBuilder: FormBuilder,
              private changeRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.rejectForm = this.formBuilder.group(
      {
        remarks: [null, Validators.required]
      }
    );
    this._ads = new BehaviorSubject<AdRouting[]>([]);
    this.queue = new Queue();
    this.selectedAd = new AdRouting();
    this.currentUser = this.accesService.getCurrentUser();
    this.loadQAQueue();
    
    //refresh the queue if a message is received from a component
    this.msgSubscription = this.messageService
                               .getData()
                               .subscribe(()=>{this.loadQAQueue(); });
  }
  ngOnDestroy(){
    this.msgSubscription.unsubscribe();
    this.msgSubscription = null;
    this.selectedAd = null;
    this.taskHistory = null;
    this.currentUser = null;
    this.changeRef.detach();
    
  }
   onComponentMsgReceived(data:any){
    console.log(data);
  }
  sendComponentMsg(msg: any){

    let message: ComponentMessage ={
      data: msg,
      component: 'DP',
      sender: this.currentUser
    };
  
  }

  detectChanges(){
    
    if(!(this.changeRef as ViewRef).destroyed){
      this.changeRef.detectChanges();
    }
  }

   loadQAQueue(){
    if(this.currentUser.role.role ==='QA')
       this.getQAQueuesById(this.currentUser.id);
    else this.getQAQueues();
  }

   getQAQueues(){
    this.routingService
        .getQARouting()
        .subscribe(
          (res:AdRouting[])=>{
            // this.ads = res;
            this._ads.next(res);
            this.detectChanges();
            this.loading = false;
          },
          (err:any)=>{
            console.log(err);
            this.loading = false;
          }
        )
  }

   getQAQueuesById(id: number){
    this.routingService
        .getQARoutingById(id)
        .subscribe(
          (res:AdRouting[])=>{
            // this.ads = res;
            this._ads.next(res);
            this.detectChanges();
            this.loading = false;
          },
          (err:any)=>{
            console.log(err);
            this.loading = false;
          }
        )
  }
  approveTask(adRouting: AdRouting){

    if(adRouting.taskHistory.length > 0){
      this.loading = true;
      let history = adRouting.taskHistory[0];    
      this.routingService
          .qaApprove(history)
          .subscribe(
            (res:any)=>{
              this.loading = false;
              this.onUpdate.emit(adRouting);
            },
            (err:any)=>{
              console.log(err);
              this.loading = false;
            }
          );
    }

  }

  showRejectModal(adRouting: AdRouting){
    this.selectedAd = adRouting;
    this.rejectForm.reset();
    this.reject_modal.show();
  }

  rejectTask(){
    let adRouting = this.selectedAd;

    if(adRouting.taskHistory.length > 0){
      this.loading = true;
      let history = adRouting.taskHistory[0];  
      history.remarks = this.rejectForm.controls['remarks'].value;  
      this.routingService
          .qaReject(history)
          .subscribe(
            (res:any)=>{
              this.loading = false;
              this.reject_modal.hide();
              this.onUpdate.emit(adRouting);
            },
            (err:any)=>{
              console.log(err);
              this.loading = false;
            }
          );
    }

 
  }

  startTask(adRouting: AdRouting){
  
    let taskHistory = new TaskHistory();
    taskHistory.adId = adRouting.adId;
    taskHistory.userId = this.currentUser.id;
    this.loading = true;
    this.routingService
        .taskStart(taskHistory)
        .subscribe(
          (res:any)=>{
            this.loading = false;
            this.onUpdate.emit(adRouting);
          },
          (err:any)=>{
            this.loading = false;
            console.log(err);
          }
        );
        
        
  }

  
  viewDetails(ad){
    this.selectedAd = ad;
    this.order_detail.show();
  }

  viewStatus(adRouting: AdRouting){
    this.selectedAd = adRouting;
    this.taskHistory = adRouting.taskHistory;
    this.order_status.show();
  }

  canStart(adRouting: AdRouting){

    let start =false;
    if(adRouting.taskHistory.length > 0){
      //get the most recent task history
      let history = adRouting.taskHistory[0];
      start = history.end !== null && this.currentUser.role.role ==='QA';
    }
    return start;
  }

  canApproveOrReject(adRouting: AdRouting){
    let approve = false;

    if(adRouting.taskHistory.length > 0){
      //get the most recent task history
      let history = adRouting.taskHistory[0];
      approve = history.start != null &&
                history.end === null &&
                this.currentUser.role.role ==='QA' &&
                this.currentUser.id === history.userId;
    }
    return approve;

  }
 

}










