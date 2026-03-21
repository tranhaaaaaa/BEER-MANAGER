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
      this.toastService.error("Thông tin tài khoản hoặc mật khẩu không chính xác!");
      return;
    }
    this.authService.Login(this.form.value).subscribe({
  next: (res: any) => {

    if (!res.IsSuccess) {
      this.toastService.error(res?.Message);
      return;
    }
    this.toastService.success("Đăng nhập thành công");
    let userLogged: UserLogged = new UserLogged();
    userLogged.setCurrentUser(
      res.Data.token,
      res.Data.username,
      res.Data.shopId
    );
  },
  error: (err) => {
    this.toastService.error(err.error?.message || "Đăng nhập thất bại");

  }
});
    

  }

}