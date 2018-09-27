import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdAssignment } from '../model/ad-assignment';
import { AdMember } from '../model/ad-member';
import { TaskHistory } from '../model/task-history';
import { AdRouting } from '../model/ad-routing';
import { DateRange } from '../model/date-range';
import { DispatchedAd } from '../model/dispatched-ad';
import { AuditedAd } from '../model/audited-ad';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private http: HttpClient) { }

  getAds(){
    return this.http.get('/routing/ads');
  } 
  getAuditedAds(){
    return this.http.get('/routing/audited');
  } 
  getArtistRouting(){
    return this.http.get('/routing/artist');
  } 
  
  getArtistRoutingById(id:number){
    return this.http.get('/routing/artist/' + id);
  }
  getDPRouting(){
    return this.http.get('/routing/dp');
  } 
  
  getDPRoutingById(id:number){
    return this.http.get('/routing/dp/' + id);
  }

  getQARouting(){
    return this.http.get('/routing/qa');
  } 
  
  getQARoutingById(id:number){
    return this.http.get('/routing/qa/' + id);
  }

  getCompletedRouting(){
    return this.http.get('/routing/completed');
  }
  getDispatchedRouting(){
    return this.http.get('/routing/dispatched');
  }
  taskStart(taskhistory: TaskHistory){
    return this.http.post('/routing/start',taskhistory);
  }
  artistApprove(taskhistory: TaskHistory){
    return this.http.post('/routing/artist/approve',taskhistory);
  }
  artistReject(taskhistory: TaskHistory){
    return this.http.post('/routing/artist/reject',taskhistory);
  }
  dpApprove(taskhistory: TaskHistory){
    return this.http.post('/routing/dp/approve',taskhistory);
  }
  dpReject(taskhistory: TaskHistory){
    return this.http.post('/routing/dp/reject',taskhistory);
  }
  qaApprove(taskhistory: TaskHistory){
    return this.http.post('/routing/qa/approve',taskhistory);
  }
  qaReject(taskhistory: TaskHistory){
    return this.http.post('/routing/qa/reject',taskhistory);
  }

  dispatchAd(adRouting: AdRouting){
    return this.http.post('/routing/support/dispatch_ads',adRouting);
  }
  importFile(data){
    return this.http.post('/routing/importFromFile',data);
  }

  addRouting(adAssignment: AdAssignment[]){
    return this.http.post('/routing/add_routing',adAssignment);
  }
  assignMembers(adAssignment: AdAssignment){
    return this.http.post('/routing/assign_members',adAssignment);
  }
 

  searchRouting(dateRange: DateRange){
    return this.http.post('/routing/search_dispatched',dateRange);
  }

  searchSummary(dateRange: DateRange){
    return this.http.post('/routing/search_summary',dateRange);
  }

  downloadSummaryReport(routings: any){
    return this.http.post('/routing/download_summary_report',routings, httpOptions);
  }

  downloadDispatchReport(routings: any){
    return this.http.post('/routing/download_dispatch_report',routings, httpOptions);
  }

  auditAd(ad:AuditedAd){
    return this.http.post('/routing/audit_ad',ad, httpOptions);
 
  }
}
