import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, ChangeDetectorRef, ViewRef} from '@angular/core';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { BroadcasterService } from '../../services/broadcaster.service';
import { Ad } from '../../model/ad';
import { ModalDirective } from 'ngx-bootstrap';
import { AdAssignment } from '../../model/ad-assignment';
import { AdRouting } from '../../model/ad-routing';
import { TaskHistory } from '../../model/task-history';
import { TaskHistoryService } from '../../services/taskhistory.service';
import { AccessService } from '../../services/access.service';
import { User } from '../../model/user';
import { RoutingService } from '../../services/routing.service';
import { MessagingService } from '../../services/messaging.service';
import { ComponentMessage } from '../../model/component-message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dp-queue',
  templateUrl: './dp-queue.component.html',
  styleUrls: ['./dp-queue.component.css']
})
export class DpQueueComponent implements OnInit, OnDestroy {
  
  get ads(): AdRouting[]{
    return this._ads.getValue();
 }

 _ads = new BehaviorSubject <AdRouting[]> ([]);

  @Output('onUpdate')
  onUpdate = new EventEmitter();

  selectedAd: AdRouting;
  taskHistory: TaskHistory[];
  queue: any;

  @ViewChild('order_detail')
  order_detail: ModalDirective

  @ViewChild('order_status')
  order_status: ModalDirective

  
  @ViewChild('reject_modal')
  reject_modal: ModalDirective


  loading: boolean;
  currentUser: User;
  msgSubscription: Subscription;

  rejectForm: FormGroup;

  constructor(private accessService: AccessService,
              private taskHistoryService: TaskHistoryService,
              private routingService: RoutingService,
              private changeRef: ChangeDetectorRef,
              private messageService: MessagingService,
              private formBuilder: FormBuilder) {
                
 
  }

  ngOnInit() {
    this.taskHistory = [];
    this.selectedAd = new AdRouting();
    this.rejectForm = this.formBuilder.group(
      {
        'remarks': [null, Validators.required]
      }
    );
    this.currentUser = this.accessService.getCurrentUser();
    this.loadDPQueues();

     //refresh the queue if a message is received from a component
     this.msgSubscription = this.messageService 
                                .getData()
                                .subscribe(()=>{ this.loadDPQueues(); });

  }
  ngOnDestroy(){
    this.msgSubscription.unsubscribe();
    this.msgSubscription = null;
    this.currentUser = null;
    this.rejectForm = null;
    this.changeRef.detach();
  }

  detectChanges(){
    if(!(this.changeRef as ViewRef).destroyed){
      this.changeRef.detectChanges();
    }
  }
  /*Component Message callback handler*/
  private onComponentMsgReceived(data:any){
    
    console.log(this.loadDPQueues);
      if(data.sender !=='DP'){
        // this.loadDPQueues();
       }
  }
  loadDPQueues(){
    
    if(this.currentUser.role.role ==='DP') 
      this.getDPQueuesById(this.currentUser.id);
    else 
      this.getDPQueues();
  }

  getDPQueues(){
   this.routingService
       .getDPRouting()
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

       );
  }
  showRejectModal(adRouting: AdRouting){
    this.selectedAd = adRouting;
    this.rejectForm.reset();
    this.reject_modal.show();
  }

  getDPQueuesById(id: number){
   this.routingService
       .getDPRoutingById(id)
       .subscribe(
         (res:any)=>{
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
      
    let taskHistory = adRouting.taskHistory[0];
    this.loading = true;


    this.routingService
        .dpApprove(taskHistory)
        .subscribe(
          (res:any)=>{
            this.onUpdate.emit(adRouting);
            this.loading = false;
          },
          (err:any)=>{
            console.log(err);
            this.loading = false;
          }
        );
  }
  startTask(adRouting: AdRouting){
    let taskHistory = new TaskHistory();
    taskHistory.adId = adRouting.adId;
    taskHistory.userId = this.currentUser.id;
    this.loading = true;
    // console.log('start task');
    // console.log(adRouting);
    this.routingService
        .taskStart(taskHistory)
        .subscribe(
          (res:any)=>{
            // this.loadDPQueues();
            this.onUpdate.emit(adRouting);
            this.loading = false;
          },
          (err:any)=>{
            console.log(err);
            this.loading = false;
          }
        );
  }

  rejectTask (){
    let adRouting = this.selectedAd;
    if(adRouting.taskHistory.length > 0 && this.rejectForm.valid){
        this.loading = true;
        let history:TaskHistory = adRouting.taskHistory[0];
        history.remarks = this.rejectForm.controls['remarks'].value;
        
        //console.log(history);
       
        this.routingService
            .dpReject(history)
            .subscribe(
              (res:any)=>{
                // this.loadDPQueues();
                this.reject_modal.hide();
                this.onUpdate.emit(adRouting);
                this.loading = false;
              },
              (err:any)=>{
                console.log(err);
                this.loading = false;
              }
            );
     }

 
  }

  canApproveOrReject(adRouting: AdRouting){

    let approve = false;

    if(adRouting.taskHistory.length > 0){
      let history = adRouting.taskHistory[0];
      approve = (history.userId === this.currentUser.id) &&
                (history.start !==null && history.end === null);
    }
    return approve;

  }
  canStart(adRouting: AdRouting){

    let start = false;

    if(adRouting.taskHistory.length > 0){
      let history = adRouting.taskHistory[0];
       start =  (history.role =='Artist' && history.status==='APPROVED') &&
                this.currentUser.role.role ==='DP';
    }
    return start;

  }


  viewDetails(ad: AdRouting){
    this.selectedAd = ad;
    this.order_detail.show();
  }

  viewStatus(adRouting: AdRouting){
    // this.selectedAd = ad;
    // this.getTaskHistory(ad);

    this.taskHistory = adRouting.taskHistory;
    console.log(this.taskHistory);

    this.order_status.show();
  }
  getTaskHistory(adRouting: AdRouting){

    let id = adRouting.adId;
    this.taskHistory = [];
    if(id){
      this.taskHistoryService
      .getTaskHistory(id)
      .subscribe(
        (res:TaskHistory[])=>{
          this.taskHistory = res;
        },
        (err:any)=>{
          console.log(err);
        }
      );
    }

  }
}
