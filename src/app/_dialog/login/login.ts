import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalModule } from '@coreui/angular';
import { AuthenService } from '../../_services/authen.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from '../../_helper/userLogged';

@Component({
  selector: 'app-login',
    imports: [CommonModule, ModalModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 visible = false;

  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService : AuthenService,
    private toastService : ToastrService
  ) {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
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
    this.authService.Login(this.form.value).subscribe((data : any) => {
        this.toastService.success("Dang nhap thanh cong")
          let userLogged: UserLogged = new UserLogged();
          userLogged.setCurrentUser(data.token,data.username,data.shopId);
           window.location.href = '/';
           console.log("Login data", this.form.value);
    })
    

  }

}