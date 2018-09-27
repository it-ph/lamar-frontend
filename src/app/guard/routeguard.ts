import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
  })
export class RouteGuard implements CanActivate {
  constructor(private router: Router,
              private cookieService: CookieService) {}

  canActivate( route: ActivatedRouteSnapshot) {
    //console.log('called');
    let data = route.data['config'];
    let token = this.cookieService.get('lamar-token');
   // console.log(data);
   // console.log(token);

    if(!data.authenticated){ //if does not need authentication
      
      if(token){
        this.checkToken(token);
      }
      return true;

    }else{

      //if authentication is needed; check if the users role fits to the required role(s)
      if(token){
        let requiredRole = data.roles[0]; //uses array in case multiple roles per route is required
        return this.isValid(token,requiredRole);
       // return true;

      }else{
        this.router.navigate(['/']); //redirect to login page if not authenticated     
        return false;
      } 
    } 
  
  }

  private isValid(token,requiredRole){
    let userToken = token.split('.')[1];
    let user = JSON.parse(atob(userToken));
    let role = user.role.role;
    return role === requiredRole;
        
  }

  private checkToken(token){
    let userToken = token.split('.')[1];
    let user = JSON.parse(atob(userToken));
    
    let role = user.role.role;
    switch(role){

      case 'Admin': console.log('Admin');
                    this.router.navigate(['/admin']); 
                    break;

      case 'Team Leader': 
                    this.router.navigate(['/team-leader']); 
                    break;

      case 'Support': 
                    this.router.navigate(['/support']); 
                    break;

      case 'Artist': 
                    this.router.navigate(['/artist']); 
                    break;

      case 'DP':
                    this.router.navigate(['/dp']); 
                    break;

      case 'Proofer':
                    this.router.navigate(['/proofer']); 
                    break;

      case 'QA': 
                    this.router.navigate(['/qa']); 
                    break;

      case 'Auditor': 
                    this.router.navigate(['/auditor']);  
                    break;
    }
        
  }


}

