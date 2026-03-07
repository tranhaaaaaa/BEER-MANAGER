import { Component, HostListener, Input } from '@angular/core';
import { IMenuItem, menuItems } from './constant';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  @Input() collapsed = false;

  menu: IMenuItem[] = menuItems;

  openedMenus: number[] = [];

  constructor(private router : Router){}

  toggleSubMenu(index: number) {
 this.collapsed = false;
    const i = this.openedMenus.indexOf(index);

    if (i > -1) {
      this.openedMenus.splice(i, 1);
    } else {
      this.openedMenus.push(index);
    }
  }
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1400) {
      this.collapsed = false;
    }
  }
  onClick(){
    if (window.innerWidth <= 1400) {
      this.collapsed = false;
    }
  }
}