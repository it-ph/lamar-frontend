import { Component, OnInit, ViewChild } from '@angular/core';
import { AdRouting } from '../../model/ad-routing';
import { RoutingService } from '../../services/routing.service';
import { RoutingPipe } from '../../pipes/routing.pipe';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';
import { AuditedAd } from '../../model/audited-ad';

@Component({
  selector: 'app-audited',
  templateUrl: './audited.component.html',
  styleUrls: ['./audited.component.css']
})
export class AuditedComponent implements OnInit {

  search_keyword: string;
  itemsPerPage: number;
  maxSize: number;
  currentPage: number;
  ads: AuditedAd[];
  filteredList: AuditedAd[];
  currentPageList: AuditedAd[];
  numPageSelection: number[];

  
  @ViewChild('audit_modal')
  audit_modal: ModalDirective

  selectedAd: AuditedAd;

  auditForm: FormGroup;

  constructor(private routingService: RoutingService,
              
              private routingFilter: RoutingPipe) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.getAuditedAds();
  } 

  initData(data: AuditedAd[]){
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

  getAuditedAds(){

    this.routingService
        .getAuditedAds()
        .subscribe(
          (res:AuditedAd[])=>{

            for(let ads of res){
              let mem = JSON.parse(ads.members);
              ads.artist = mem[0].user;
              ads.dp = mem[1].user;
              ads.qa = mem[2].user;
              
            }
            this.initData(res);

          },
          (err:any)=>{
            console.log(err);
          }
        );
  }


  onNumPageSelect(event){
    this.itemsPerPage = + event.target.value;
    this.filterList();
  }

  filterList(){
    this.filteredList = this.routingFilter.transform(this.ads, this.search_keyword);
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


}
