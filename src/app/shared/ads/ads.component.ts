import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdAssignment } from '../../model/ad-assignment';
import { AdService } from '../../services/ad.service';
import { ModalDirective } from 'ngx-bootstrap';
import { AdAssignmentPipe } from '../../pipes/ad-assignment.pipe';
import { Ad } from '../../model/ad';
import { AdPipe } from '../../pipes/ad.pipe';
import { Subscription, Observable } from 'rxjs';
import { StompService } from '@stomp/ng2-stompjs';
import { ComponentMessage } from '../../model/component-message';
import { AccessService } from '../../services/access.service';
import { User } from '../../model/user';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  providers: [AdService]
})
export class AdsComponent implements OnInit {

  ads: Ad[];
  currentPageList: Ad[];
  filteredList: Ad[];
  currentPage: number;
  itemsPerPage: number;
  maxSize: number;
  numPageSelection: number[];
  search_keyword: string;

  importResponse: any;
  importError: string;

  selectedFile: any;
  currentUser: User;
  @ViewChild('order_import')
  order_import: ModalDirective

  @ViewChild('uploadEl') 
  uploadElRef: ElementRef;



  constructor(private routingService: RoutingService,
              private adsFilter: AdPipe,
              private stompService: StompService,
              private accessService: AccessService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.getAds();
    this.currentUser = this.accessService.getCurrentUser();
  }
  initData(data: Ad[]){
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

  getAds(){
    this.routingService
        .getAds()
        .subscribe(
          (res:Ad[])=>{
            this.initData(res);
          },
          (err:any)=>{
            console.log(err);
          }

        )
  }

  onNumPageSelect(event){
    this.itemsPerPage = + event.target.value;
    this.filterList();
  }
  filterList(){
    this.filteredList = this.adsFilter.transform(this.ads, this.search_keyword);
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
      this.routingService
          .importFile(input)
          .subscribe(
            (res:any)=>{
              this.importResponse = res;
              
            },
            (err:any)=>{
              this.importError = err.error.message;
            }
          );
    }

  }
  importFile(){
 
    this.routingService
        .addRouting(this.importResponse)
        .subscribe(
          (res:any)=>{
            console.log(res);
            let message:ComponentMessage = {
              data: this.importResponse,
              component: 'Ads',
              sender: this.currentUser

            };
            this.stompService.publish('/app/user-status',JSON.stringify(message));
            this.getAds();
            this.order_import.hide();
          },
          (err:any)=>{
            this.importError = err.error.message;
          }
        );

  }

}
