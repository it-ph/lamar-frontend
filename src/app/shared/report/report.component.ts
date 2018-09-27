import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { DateRange } from '../../model/date-range';
import { AdRouting } from '../../model/ad-routing';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { FileSaverService } from '../../services/file-saver.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dispatchStart: any;
  dispatchEnd: any;

  summaryStart: any;
  summaryEnd: any;
  dispatchResult: any[];
  summaryResult: any;
  
  dispatchResultPage: number;
  dispatchResultItemsPerPage: number;
  dispatchResultCurrentList: any[];

  summaryResultPage: number;
  summaryResultItemsPerPage: number;
  summaryResultCurrentList: any[];

  constructor(private routingService: RoutingService,
              private cookieService: CookieService,
              private fileSaver: FileSaverService) {

   }

  ngOnInit() {
    this.dispatchResultPage =1;
    this.dispatchResultItemsPerPage = 10;

    this.summaryResultPage = 1;
    this.summaryResultItemsPerPage = 10;


  }
  searchSummary(){

    let dateRange:DateRange = { start: this.summaryStart, end: this.summaryEnd};
    this.routingService
        .searchSummary(dateRange)
        .subscribe(
          (res:any)=>{
            this.summaryResult = res;
            this.initSummaryResultPagination(1);
          }
        )
  }
  searchDispatchedAds(){

    let dateRange:DateRange = { start: this.dispatchStart, end: this.dispatchEnd};
    this.routingService
        .searchRouting(dateRange)
        .subscribe(
          (res:any)=>{
            for(let ads of res){
              let mem = JSON.parse(ads.members);
              ads.members = mem;
            }
            this.dispatchResult = res;
            this.initDispatchResultPagination(1);
        });
  }

  initDispatchResultPagination(page: number){
    const begin = ((page - 1) * this.dispatchResultItemsPerPage );
    const end = begin + this.dispatchResultItemsPerPage;
    this.dispatchResultCurrentList = this.dispatchResult.slice(begin, end);
  }

  dispatchPageChanged(event: any){
    this.initDispatchResultPagination(event.page);
  }


  initSummaryResultPagination(page: number){
    const begin = ((page - 1) * this.summaryResultItemsPerPage );
    const end = begin + this.summaryResultItemsPerPage;
    this.summaryResultCurrentList = this.summaryResult.slice(begin, end);
  }

  summaryPageChanged(event: any){
    this.initSummaryResultPagination(event.page);
  }

  downloadSummary(){
    this.routingService
        .downloadSummaryReport(this.summaryResult)
        .subscribe(
          (res:any)=>{
            this.fileSaver.saveFile(res.message,'application/octet-stream','report_summary.xlsx');
          },
          (err:any)=>{
            console.log(err);
          }
        );
    
  }

  downloadDispatch(){
    this.routingService
    .downloadDispatchReport(this.dispatchResult)
    .subscribe(
      (res:any)=>{
        this.fileSaver.saveFile(res.message,'application/octet-stream','dispatch_ads.xlsx');
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

}
