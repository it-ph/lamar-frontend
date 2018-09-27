import { Component, OnInit, ViewChild, EventEmitter, Output, ChangeDetectorRef, OnDestroy, ViewRef } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Ad } from '../../model/ad';
import { AdAssignment } from '../../model/ad-assignment';
import { Queue } from '../../model/queue';
import { AdQuery } from '../../model/ad-query';
import { AccessService } from '../../services/access.service';
import { TaskHistoryService } from '../../services/taskhistory.service';
import { TaskHistory } from '../../model/task-history';
import { AdRouting } from '../../model/ad-routing';
import { User } from '../../model/user';
import { RoutingService } from '../../services/routing.service';
import { MessagingService } from '../../services/messaging.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ComponentMessage } from '../../model/component-message';
import { QueueListener } from '../../interfaces/queue-listener';
import { CommandHandler } from '../../interfaces/command-handler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../model/member';

@Component({
  selector: 'app-dev-queue',
  templateUrl: './dev-queue.component.html',
  styleUrls: ['./dev-queue.component.css']
})
export class DevQueueComponent implements OnInit, OnDestroy{

 
 


  @Output('onUpdate')
  onUpdate = new EventEmitter<any>();

  @ViewChild('order_detail')
  order_detail: ModalDirective

  @ViewChild('order_status')
  order_status: ModalDirective

  @ViewChild('order_query')
  order_query: ModalDirective

  
  @ViewChild('members_modal')
  members_modal: ModalDirective
  
  currentUser: User;
  msgSubscription: Subscription;
  selectedAd: AdRouting;
  queryOrder: AdAssignment;
  adQuery: AdQuery;
  taskHistory: TaskHistory[];
  artists: User[];
  teamLeaders: User[];
  supports: User[];
  dps: User[];
  qas: User[];
  auditors: User[];
  memberForm: FormGroup;

  loading: boolean;

  get ads(): AdRouting[]{
    return this._ads.getValue();
  }

  _ads:any; 

  constructor(private taskHistoryService: TaskHistoryService,
              private accessService: AccessService,
              private userService: UserService,
              private routingService: RoutingService,
              private changeRef: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private messageService: MessagingService) { 

              
  }

  ngOnInit() {
    this._ads = new BehaviorSubject<AdRouting[]>([]);
    this.currentUser = this.accessService.getCurrentUser();
    this.taskHistory = [];
    this.selectedAd = new AdRouting();
    this.queryOrder = new AdAssignment();
    this.adQuery = new AdQuery();  
    this.loadArtistQueue();
    this.loadMembers();
    this.memberForm = this.formBuilder
                          .group({
                            'artist': [null, Validators.required],
                            'dp': [null, Validators.required],
                            'qa': [null, Validators.required]
                          });
    //refresh the queue if a message is received from a component
    this.msgSubscription = this.messageService 
                               .getData()
                               .subscribe(()=>{ this.loadArtistQueue(); });
   
  }
  ngOnDestroy(){
    this.msgSubscription.unsubscribe();
    this.msgSubscription = null;
    this.currentUser = null;
    this.selectedAd = null;
    this.queryOrder = null;
    this.adQuery = null;
    this.teamLeaders = null;
    this.supports = null;
    this.dps = null;
    this.qas = null;
    this.auditors = null;
    this.changeRef.detach();
  }

  
  private loadMembers(){
    if(this.currentUser.role.role ==='Team Leader' || this.currentUser.role.role ==='Support'){
        
        this.getArists();
        this.getDPs();
        this.getQAs();
    }
  }

  showAssignModal(adRouting: AdRouting){
    this.loadMembers();
    this.selectedAd = adRouting;
    this.memberForm.reset();
    this.members_modal.show();
  }

  assignMembers(){
    console.log(this.selectedAd);
    if(this.memberForm.valid){

      let editAd:Ad = new Ad();
      editAd.id = this.selectedAd.adId;

      let devMember:Member ={
        id: +this.memberForm.controls['artist'].value,
        name: null
      };

      let dpMember:Member ={
        id: +this.memberForm.controls['dp'].value,
        name: null
      };

      let qaMember:Member ={
        id: +this.memberForm.controls['qa'].value,
        name: null
      };
      let adAssignment: AdAssignment ={
        ad: editAd,
        artist: devMember,
        dp: dpMember,
        qa: qaMember
      };

      this.loading = true;

      this.routingService
          .assignMembers(adAssignment)
          .subscribe(
            (res:any)=>{
              console.log(res);
              this.selectedAd = new AdRouting();
              this.members_modal.hide();
              this.onUpdate.emit(adAssignment);
              this.loading = false;
            },
            (err:any)=>{
              this.loading = false;
            }
          );
    }
   
  }
  getArists(){
    
    this.userService
        .getArtists()
        .subscribe(
          (res:any)=>{
            this.artists = res;
          },
          (err:any)=>{
            console.log(err);
          }
        )
  }
  getSupports(){
    this.userService
      .getSupports()
      .subscribe(
        (res:any)=>{
          this.supports = res;
        },
        (err:any)=>{
          console.log(err);
        }
      );
  }

  getDPs(){
    this.userService
      .getDPs()
      .subscribe(
        (res:any)=>{
          this.dps = res;
        },
        (err:any)=>{
          console.log(err);
        }
      );
  }

  
  getQAs(){
    this.userService
      .getQAs()
      .subscribe(
        (res:any)=>{
          this.qas = res;
        },
        (err:any)=>{
          console.log(err);
        }
      );
  }

  detectChanges(){
    if(!(this.changeRef as ViewRef).destroyed){
      this.changeRef.detectChanges();
    }
  }
 


  loadArtistQueue(){


    if(this.currentUser.role.role ==='Artist') 
      this.getArtistQueueById(this.currentUser.id);
    else 
      this.getArtistQueues();
    
  }

  getArtistQueueById(id:number){
    
    this.routingService
        .getArtistRoutingById(id)
        .subscribe(
          (res:AdRouting[])=>{
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

  getArtistQueues(){
    this.routingService
        .getArtistRouting()
        .subscribe(
          (res:AdRouting[])=>{
            this._ads.next(res);
          //  console.log(this.ads);
            this.detectChanges();
            this.loading = false;
          },
          (err:any)=>{
            console.log(err);
            this.loading = false;
          }
        )
  }
  
  getTaskHistory(adRouting: AdRouting){
    console.log(adRouting);

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
  viewDetails(ad){
    this.selectedAd = ad;
    this.order_detail.show();
  }
  viewStatus(adRouting: AdRouting){
    console.log(adRouting);
    this.taskHistory = adRouting.taskHistory;
    this.order_status.show();
  }
  approve(adRouting: AdRouting){

    if(adRouting.taskHistory.length > 0){

      let history = adRouting.taskHistory[0];
      console.log(history);


      // this.routingService
      //     .artistApprove(history)
      //     .subscribe(
      //       res=>{

      //       // this.sendComponentMsg(adRouting);
      //       this.onUpdate.emit(adRouting);
      //       },
      //       err=>{
      //         console.log(err);
      //       }
      //     )
    }

  }

  sendComponentMsg(msg: any){

    let message:ComponentMessage ={
      data: msg,
      component: 'Artist',
      sender: this.currentUser
    };
  
    }
  showQueryModal(adAssignment){
    this.queryOrder = adAssignment;
    this.adQuery = new AdQuery();
    this.adQuery.member = this.queryOrder.artist;
    this.adQuery.ad = this.queryOrder.ad;
    this.order_query.show();
  }

  addQuery(){
    console.log(this.adQuery);
  }
  canEdit(adAssignment: AdAssignment): boolean{
    return false;
    // let currentUser = this.accessService.getCurrentUser();
    // return this.editable && (adAssignment.artist.name === currentUser.name);
  }

  hasStarted(adRouting: AdRouting){
    // return adRouting.recentHistory ? true : false;
    return false;
  }

  canStart(adRouting: AdRouting){
    
    let start = false;
    

    if(adRouting.taskHistory.length > 0){

      let history = adRouting.taskHistory[0];
      start = history.end !== null && this.currentUser.role.role ==='Artist';

    }else{
      start = this.currentUser.role.role === 'Artist';
    }
    
    return start;
  }

  canApprove(adRouting: AdRouting){
    let approve = false;

    if(adRouting.taskHistory.length > 0){
      //get the most recent task history
      let history = adRouting.taskHistory[0];
      approve = history.start != null &&
                history.end === null &&
                this.currentUser.role.role ==='Artist' &&
                this.currentUser.id === history.userId;
    }
    return approve;

  }
  canAssign(adRouting: AdRouting){
     return adRouting.taskHistory.length === 0 && (this.currentUser.role.role ==='Support' || this.currentUser.role.role ==='Team Leader');

  }

  startTask(adRouting: AdRouting){
    this.loading = true;
    let taskHistory = new TaskHistory();
    taskHistory.adId = adRouting.adId;
    taskHistory.userId = this.currentUser.id;

    this.routingService
        .taskStart(taskHistory)
        .subscribe(
          (res:any)=>{
          // this.sendComponentMsg(adRouting);
          // this.loadArtistQueue();
            this.onUpdate.emit(adRouting);
            this.loading = false;
          },
          (err:any)=>{
            console.log(err);
            this.loading = false;
          }
        );
    }

    approveTask(adRouting: AdRouting){
      

      if(adRouting.taskHistory.length > 0){
        this.loading = true;
        let history = adRouting.taskHistory[0];
        
        this.routingService
            .artistApprove(history)
            .subscribe(
              (res:any)=>{
              // this.sendComponentMsg(adRouting);
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

  

}
