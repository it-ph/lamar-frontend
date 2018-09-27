import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate{
    
    constructor(private router: Router,
                private cookieService: CookieService
    ){}

    canActivate(route: ActivatedRouteSnapshot){
        let token = this.cookieService.get('lamar-token');
        
        let authenticated = route.data['authenticated'];

        if(!authenticated){ //if does not need authentication
          
            if(token){
              this.router.navigate(['/']);
            }
            return true;
      
          }else{
      
            //if authentication is needed; check if the token is Valid
            if(token){
         

              if(this.isValid(token)){
                  return true;
              }else{
                  this.cookieService.delete('lamar-token');
                  this.router.navigate(['/login']); //redirect to login page if not valid token  
                  return false;
              }
             // return true;
      
            }else{
              this.router.navigate(['/login']); //redirect to login page if not authenticated     
              return false;
            } 
          } 
    }

    private isValid(token){
        let valid = false;
        try{
            let userToken = token.split('.')[1];
            let data = JSON.parse(atob(userToken));
            valid = data ? true : false;
            return valid;
        }catch(e){
            return valid;
        }
       

    
       
            
      }
}
