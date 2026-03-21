import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from '../../_models/db.model';
import { UserService } from '../../_services/user.service';

import {
  ButtonModule,
  ModalModule,
  FormModule
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { UserLogged } from '../../_helper/userLogged';

@Component({
  selector: 'app-modal-debt',
  standalone: true,
  imports: [
    ModalModule,
    ButtonModule,
    FormModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-debt.html',
  styleUrl: './modal-debt.css'
})
export class ModalDebt implements OnInit {

  visible = false;
  userlogged = new UserLogged();
  listUser: User[] = [];

  showCreateUser = false;

  selectedUserId: number | null = null;

  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: [''],
      ShopUid: [this.userlogged.getCurrentUser().userId]
    });

    this.onGetData();
  }

  onGetData() {
    this.userService.getAllUser().subscribe(res => {
      this.listUser = res.value;
    });
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.showCreateUser = false;
  }

  openCreateUser() {
    this.showCreateUser = true;
  }

  saveUser() {

    if (this.userForm.invalid) return;

    const data = this.userForm.value;

    this.userService.CreateUser(data).subscribe(() => {

      this.showCreateUser = false;
      this.userForm.reset();

      this.onGetData();
    });
  }

}