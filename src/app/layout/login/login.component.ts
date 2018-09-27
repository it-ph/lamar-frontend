import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { User } from '../../model/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccessService,CookieService]
})
export class LoginComponent implements OnInit {

  user: User;
  error: string;
  
  constructor(private accessService: AccessService,
              private cookiService: CookieService,
              private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  login(){
    this.accessService
        .login(this.user)
        .subscribe(
          (res:any)=>{
            this.cookiService.set('lamar-token',res.access_token);

            let currentUser = this.accessService.getCurrentUser();
            if(currentUser){
              let role = currentUser.role.role;
              this.accessService.userRedirect(role);
            }
          },
          (err: any)=>{
            console.log(err);
            this.error = err.error.message;
          }
        )
  }

}
