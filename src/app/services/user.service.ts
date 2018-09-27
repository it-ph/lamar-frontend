import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  changePassword(user: any){
    
    return this.http.post('/users/changePassword',user);
  }
  addUser(user: User){
    
    return this.http.post('/users/add',user);
  }
  getUsers(){
    return this.http.get('/users',httpOptions);
  }
  getRoles(){
    return this.http.get('/users/roles',httpOptions);
  }
  getArtists(){
    return this.http.get('/users/artists',httpOptions);
  }

  getTeamLeaders(){
    return this.http.get('/users/team-leaders',httpOptions);
  }

  getSupports(){
    return this.http.get('/users/supports',httpOptions);
  }

  getDPs(){
    return this.http.get('/users/dps',httpOptions);
  }


  getQAs(){
    return this.http.get('/users/qas',httpOptions);
  }

  getAuditors(){
    return this.http.get('/users/auditors',httpOptions);
  }

  disableUser(user: User){
    return this.http.post('/users/disableUser',user);
  }
  enableUser(user: User){
    return this.http.post('/users/enableUser',user);
  }
}
