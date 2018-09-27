import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private router: Router) { }

  login(user: User): Observable<any> {

    return this.http.post('/authenticate', user, httpOptions);
  }

  logout(){
    this.cookieService.delete('lamar-token');
    this.router.navigate(['/']); //login is the default landing page

  
  }

  getCurrentUser(): any{
    try{

      let token = this.cookieService.get('lamar-token');
      let userToken = token.split('.')[1];
      let data = JSON.parse(atob(userToken));
      let user = new User();
      user.id = data.id;
      user.name = data.name;
      user.role = data.role;

      return user;
    }catch(e){
      return null;
    }
  }
  userRedirect(role){
    switch(role){

      case 'Artist' : 
            this.router.navigate(['/artist']); 
            break;
                      
      case 'DP' :
           this.router.navigate(['/dp']); 
           break;
                      
      case 'QA' : 
           this.router.navigate(['/qa']); 
           break;

      case 'Admin' : 
            this.router.navigate(['/admin']); 
            break;

      case 'Support' : 
            this.router.navigate(['/support']); 
            break;
                      
      case 'Team Leader' : 
            this.router.navigate(['/team-leader']); 
            break;

      case 'Auditor' : 
            this.router.navigate(['/auditor']); 
            break
    }
  }
}
