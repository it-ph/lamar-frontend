import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdAssignment } from '../model/ad-assignment';
import { AdMember } from '../model/ad-member';
import { AdRouting } from '../model/ad-routing';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient) { }


  getAds(){
    return this.http.get('/ads');
  }

  importFile(data){
    return this.http.post('/ads/import',data);
  }

  addRouting(adAssignment: AdAssignment[]){
    return this.http.post('/ads/add_routing',adAssignment);
  }

  downloadReport(routings: AdRouting[]){
    return this.http.post('/ads/download_report',routings);
  }

}
