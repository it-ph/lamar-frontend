import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { ModalDirective } from 'ngx-bootstrap';
import { User } from '../../model/user';
import { AdAssignment } from '../../model/ad-assignment';
import { Ad } from '../../model/ad';
import { Subject, Subscription } from 'rxjs';
import { BroadcasterService } from '../../services/broadcaster.service';
import { AccessService } from '../../services/access.service';
import { AdMember } from '../../model/ad-member';

@Component({
  selector: 'app-routing-queue',
  templateUrl: './routing-queue.component.html',
  styleUrls: ['./routing-queue.component.css']
})
export class RoutingQueueComponent implements OnInit {

  ads: any[];

  @Input()
  routings: AdAssignment[];

  @Input()
  artists: User[];

  @Input()
  teamLeaders: User[];
  @Input()
  supports: User[];

  @Input()
  dps: User[];

  @Input()
  qas: User[];

  auditors: User[];

  selectedFile: any;

  selectedRouting: AdAssignment;
  selectedAd: Ad;
  
  eventService = new Subject();

  subscription: Subscription;

  importError: string;

  @ViewChild('order_detail')
  order_detail: ModalDirective

  @ViewChild('order_import')
  order_import: ModalDirective

  @ViewChild('assign_member')
  assign_member: ModalDirective

  @ViewChild('uploadEl') 
  uploadElRef: ElementRef;

  @Output()
  onMemberAssigned = new EventEmitter();

  importResponse: any;

  @Input()
  canImport: boolean;
  
  @Input()
  canPick: boolean;

  @Input()
  userRole: string;


  constructor(private adService: AdService,
              private userService: UserService,
              private accessService: AccessService) { 

  }

  ngOnInit() {
    this.selectedRouting = new AdAssignment();
    this.selectedAd = new Ad();

  }


  viewDetails(ad){
    this.selectedAd = ad;
    this.order_detail.show();
  }

  showAssignModal(ad){
    this.selectedRouting = new AdAssignment();
    this.selectedRouting.ad = ad;
    this.assign_member.show();
  }
  assignMembers(){
    console.log(this.selectedRouting);
  }
  searchUser(term: String, item: User){
    
    let query = term.toLowerCase();
    let search = item.name.toLowerCase();
    return search.includes(query);
  }
  showImportModal(){
    this.importResponse = null;
    this.importError = null;
    this.uploadElRef.nativeElement.value ='';
    this.order_import.show();
  }
  onFileChange(event: any){
    this.importError = null;
    this.importResponse = null;
    let file = event.target.files[0];

    if(file){

      this.selectedFile = file;
      let input = new FormData();
      input.append('file',this.selectedFile);
      this.adService
          .importFile(input)
          .subscribe(
            (res:any)=>{
              this.importResponse = res;
              
            },
            (err:any)=>{
              console.log(err);
            
            }
          );
    }

  }
  importFile(){
 
    this.adService
        .addRouting(this.importResponse)
        .subscribe(
          (res:any)=>{
            console.log(res);
            this.onMemberAssigned.emit(res);
            this.order_import.hide();
          },
          (err:any)=>{
            this.importError = err.error.message;
          }
        );

  }




  
}
