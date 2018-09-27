import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskHistoryService {

  constructor(private http: HttpClient) { }

  getTaskHistory(id:number){
    return this.http.get('/taskhistory/'+id);
  }
  getArtistTaskHistory(id:number){
    return this.http.get('/taskhistory/artist/'+id);
  }

  getDPTaskHistory(id:number){
    return this.http.get('/taskhistory/dp/'+id);
  }

  getQATaskHistory(id:number){
    return this.http.get('/taskhistory/qa/'+id);
  }
}
