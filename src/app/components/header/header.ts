import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonDirective } from '@coreui/angular';
import { Login } from "../../_dialog/login/login";
import { UserLogged } from '../../_helper/userLogged';

@Component({
  selector: 'app-header',
  imports: [ButtonDirective, CommonModule, Login],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @ViewChild(Login) modal! : Login;
  isMobile : boolean = false;
  userLogged = new UserLogged();
 @Output() toggleSidebar = new EventEmitter<void>();
 constructor(){
  if(window.screen.width >= 992){
    this.isMobile = false;
  }else{
    this.isMobile = true;
  }
 }
 onLogin(){
  this.modal.open();
 }
}
