import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalModule } from '@coreui/angular';

@Component({
  selector: 'app-login',
    imports: [CommonModule, ModalModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 visible = false;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  close(){
    this.visible = false;
    this.form.reset();
  }
  open(){
    this.visible = true;
  }
  login(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    console.log("Login data", this.form.value);

  }

}