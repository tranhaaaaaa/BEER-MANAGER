import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../components/header/header";
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header,Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
 isCollapsed = false;
constructor(){
   if(window.screen.width >= 992){
    this.isCollapsed = true;
   }else{
    this.isCollapsed = false;
   }
}
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
