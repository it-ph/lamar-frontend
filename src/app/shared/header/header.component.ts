import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersComponent } from '../../users/users.component';
import { User } from '../../model/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AccessService]
})
export class HeaderComponent implements OnInit, OnDestroy {

  _user: any;

   get user(): User{
     return this._user.getValue();
   }

  newPassword: string;
  confirmPassword: string;
  error: string;

  changeForm: FormGroup;

  @ViewChild('change_password')
  change_password: ModalDirective

  constructor(private accessService: AccessService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this._user = new BehaviorSubject<User>(new User());
    this._user.next(this.accessService.getCurrentUser());
    this.changeForm = this.formBuilder.group({
        'newPassword': [null,
                         Validators.compose([
                            Validators.required,
                            Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
                         ])
                      ],
        'confirmPassword':  [null, Validators.required],
      },
      {validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword')});
  }
  ngOnDestroy(){
    this._user = null;
    this.newPassword = null;
    this.confirmPassword = null;
    this.error = null;
    this.changeForm = null;
    this.changeRef.detach();
  }
  showChangeForm(){
    this.changeForm.reset();
    this.change_password.show(); 
  }
  onLoggedOut(){
    this.accessService.logout();
  }
  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  changePassword(){

    Object.keys(this.changeForm.controls).forEach(field=>{
      const control = this.changeForm.get(field);
      control.markAsTouched({onlySelf:true});
    });
    
    if(this.changeForm.valid){
      let userData = {
        id: this.user.id,
        password: this.changeForm.controls['newPassword'].value
      }

      this.userService
      .changePassword(userData)
      .subscribe(
        (res:any)=>{
          console.log(res);
          this.change_password.hide();
        },
        (err:any)=>{
          console.log(err);
        }
      );
    }
        
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  


}
