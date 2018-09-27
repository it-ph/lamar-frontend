import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { UserPipe } from '../pipes/user.pipe';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../model/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService,UserPipe]
})
export class UsersComponent implements OnInit {

  users: User[];
  filteredList: User[];
  currentPageList: User[];
  currentPage: number;
  itemsPerPage: number;
  maxSize: number;
  numPageSelection: number[];
  search_keyword: string;
  error: string;

  roles: any[];

  selectedUser: User;

  @ViewChild('add_user')
  add_user: ModalDirective

  
  @ViewChild('change_pass_modal')
  change_pass_modal: ModalDirective

  newUserForm: FormGroup;
  changePassForm: FormGroup;
  
  constructor(private userService: UserService,
              private userFilter: UserPipe,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
    this.numPageSelection =[10,25,50,100];
    this.newUserForm = this.formBuilder
                       .group({
                                'name' :       [null, Validators.required],
                                'username':    [null, Validators.required],
                                'role':        [null, Validators.required],
                                'newPassword': [ null,
                                                 Validators.compose([
                                                 Validators.required,
                                                 Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
                                                ])
                                              ],
                                'confirmPassword':  [null, Validators.required]
                              },
                              {validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword')});

    this.changePassForm = this.formBuilder
                            .group({'newPassword': [ null,
                                                      Validators.compose([
                                                      Validators.required,
                                                      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
                                                      ])
                                                    ],
                                      'confirmPassword':  [null, Validators.required]
                                    },
                                    {validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword')});
                                                                
  }

  getUsers(){
    this.userService
        .getUsers()
        .subscribe(
          (res: User[])=>{
            //this.users = res;
            this.initData(res);
          },
          (err:any)=>{
            console.log(err);
          }
        );
  }

  getRoles(){
    this.userService
        .getRoles()
        .subscribe(
          (res:any)=>{
            this.roles = res;
          },
          (err:any)=>{
            console.log(err);
          }
        )
  }
  initData(data: User[]){
    this.search_keyword = '';
    this.maxSize = 10;
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.users = data;

    let begin = ((this.currentPage - 1) * this.itemsPerPage);
    let end = begin + this.itemsPerPage;
    this.filteredList = data;
    this.currentPageList = data.slice(begin, end);
    this.currentPage = 1;
  }

  onNumPageSelect(event){
    this.itemsPerPage = + event.target.value;
    this.filterList();
  }
  filterList(){
    this.filteredList = this.userFilter.transform(this.users, this.search_keyword);
    this.currentPage = 1;
    const begin = ((this.currentPage - 1) * this.itemsPerPage);
    const end = begin + this.itemsPerPage;
    this.currentPageList = this.filteredList.slice(begin, end);

  }

  pageChange(event: any): void {

    let begin = ((event.page - 1) * this.itemsPerPage);
    let end = begin + this.itemsPerPage;
    this.currentPageList = this.filteredList.slice(begin, end);
  }

  showAddForm(){
    this.newUserForm.reset();
    this.add_user.show();
  }

  showChangePassForm(user: User){
    this.selectedUser = user;
    this.changePassForm.reset();
    this.change_pass_modal.show();
  }

  disableUser(user: User){
    this.userService
        .disableUser(user)
        .subscribe(
          (res:any)=>{
            this.getUsers();
          },
          (err:any)=>{
            console.log(err);
          }
        )
  }
  enableUser(user: User){

    this.userService
        .enableUser(user)
        .subscribe(
          (res:any)=>{
            this.getUsers();
          },
          (err:any)=>{
            console.log(err);
          }
        );
  }
  addUser(){
    if(this.newUserForm.valid){

      let  r = new Role();
      r.id = this.newUserForm.controls['role'].value;

      let newUser = new User();
    
        newUser.name = this.newUserForm.controls['name'].value,
        newUser.username = this.newUserForm.controls['username'].value,
        newUser.role = r;
        newUser.password = this.newUserForm.controls['newPassword'].value
      

      this.userService
          .addUser(newUser)
          .subscribe(
            (res:any)=>{
              this.getUsers();
              this.add_user.hide();
            },
            (err:any)=>{
              console.log(err);
              this.error = err.error.message;
            }
          )
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

  changePassword(){

    Object.keys(this.changePassForm.controls).forEach(field=>{
      const control = this.changePassForm.get(field);
      control.markAsTouched({onlySelf:true});
    });
    
    if(this.changePassForm.valid){
     
      let userData = {
        id: this.selectedUser.id,
        password: this.changePassForm.controls['newPassword'].value
      }
      
      this.userService
      .changePassword(userData)
      .subscribe(
        (res:any)=>{
          this.change_pass_modal.hide();
        },
        (err:any)=>{
          console.log(err);
        }
      );
    }
        
  }

}
