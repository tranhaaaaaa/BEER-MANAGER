import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-header',
  imports: [ButtonDirective,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMobile : boolean = false;
 @Output() toggleSidebar = new EventEmitter<void>();
 constructor(){
  if(window.screen.width >= 992){
    this.isMobile = false;
  }else{
    this.isMobile = true;
  }
 }
}
