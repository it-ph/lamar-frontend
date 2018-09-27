import { Component, OnInit, ViewChild } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { AdRouting } from '../../model/ad-routing';
import { AdPipe } from '../../pipes/ad.pipe';
import { Ad } from '../../model/ad';
import { RoutingPipe } from '../../pipes/routing.pipe';
import { AdService } from '../../services/ad.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DispatchedAd } from '../../model/dispatched-ad';
import { DispatchedPipe } from '../../pipes/dispatched.pipe';
import { AccessService } from '../../services/access.service';
import { User } from '../../model/user';
import { AuditedAd } from '../../model/audited-ad';

@Component({
  selector: 'app-dispatched',
  templateUrl: './dispatched.component.html',
  styleUrls: ['./dispatched.component.css']
})
export class DispatchedComponent implements OnInit {

  search_keyword: string;
  itemsPerPage: number;
  maxSize: number;
  currentPage: number;
  ads: DispatchedAd[];
  filteredList: DispatchedAd[];
  currentPageList: DispatchedAd[];
  numPageSelection: number[];

  @ViewChild('audit_modal')
  audit_modal: ModalDirective

  selectedAd: DispatchedAd;

  auditInfo: AuditedAd;
  currentUser: User;
  constructor(private routingService: RoutingService,
              private formBuilder: FormBuilder,
              private accessService: AccessService,
              private dispatchFilter: DispatchedPipe,
              private adService: AdService) { }

  ngOnInit() {
    this.auditInfo = new AuditedAd();
    this.currentUser = this.accessService.getCurrentUser();
    this.init();
  }

  init(){
    this.getDispatchedAds();
  } 

  initData(data: DispatchedAd[]){
    this.search_keyword = '';
    this.maxSize = 10;
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.ads = data;
    this.numPageSelection =[10,25,50,100];

    let begin = ((this.currentPage - 1) * this.itemsPerPage);
    let end = begin + this.itemsPerPage;
    this.filteredList = data;
    this.currentPageList = data.slice(begin, end);
    this.currentPage = 1;
  }

  getDispatchedAds(){

    this.routingService
        .getDispatchedRouting()
        .subscribe(
          (res:DispatchedAd[])=>{
            this.initData(res);
          },
          (err:any)=>{
            console.log(err);
          }
        );
  }

  auditAd(){
  
    
    // this.auditInfo.auditorId = this.currentUser.id;
    console.log(this.auditInfo);
    this.routingService
        .auditAd(this.auditInfo)
        .subscribe(
          (res:any)=>{
            console.log(res);
            this.getDispatchedAds();
           this.audit_modal.hide();
          },
          (err:any)=>{
            console.log(err);
          }
        );
  
  }

  showAuditModal(dispatchedAd: DispatchedAd){
    this.auditInfo = new AuditedAd();
    this.auditInfo.adId = dispatchedAd.adId;
    this.auditInfo.auditorId = this.currentUser.id;
    this.auditInfo.adjustments ='None';
    this.auditInfo.levels ='Level 1';

    this.audit_modal.show();
  }
  onNumPageSelect(event){
    this.itemsPerPage = + event.target.value;
    this.filterList();
  }

  filterList(){
    this.filteredList = this.dispatchFilter.transform(this.ads, this.search_keyword);
    this.currentPage = 1;
    const begin = ((this.currentPage - 1) * this.itemsPerPage);
    const end = begin + this.itemsPerPage;
    this.currentPageList = this.filteredList.slice(begin, end);

  }

  pageChange(event: any): void {

    let begin = ((event.page - 1) * this.itemsPerPage);
    let end = begin + this.itemsPerPage;
    this.currentPageList = this.filteredList.slice(begin, end);
  }

  downloadReport(){
    window.open('/ads/download_report','_blank');
  }
}
