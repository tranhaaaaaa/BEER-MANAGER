import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../../_services/authen.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from '../../_helper/userLogged';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit{
 form!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService : AuthenService,
    private toastService : ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
    this.router.navigate(['/dashboard']);
  },
  error: (err) => {
    this.toastService.error(err.error?.message || "Đăng nhập thất bại");

  }
});
    

  }

}
