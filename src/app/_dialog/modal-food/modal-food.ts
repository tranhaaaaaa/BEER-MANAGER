import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../_models/db.model';
import { CategoryService } from '../../_services/category.service';
import { Products } from '../../_services/products';
import { ToastrService } from 'ngx-toastr';
import { MoneyFormatDirective } from '../../_directives/money-format.directive';
@Component({
  selector: 'app-modal-food',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,MoneyFormatDirective],
  templateUrl: './modal-food.html',
  styleUrl: './modal-food.css',
})
export class ModalFood implements OnInit{

 categories: Category[] = [];
  @Output() saveFood = new EventEmitter<any>();

  visible = false;

  foodForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: Products,
    private toastService : ToastrService
  ){
    this.foodForm = this.fb.group({
      Category: ['', Validators.required],
      ProductName: ['', Validators.required],
      Img: [''],
       CreatedAt: [null],
       ShopUid:['B9D44344-AFA5-4B76-A84D-2730FF637644'],
      Price: [0, [Validators.required, Validators.min(1000)]]
    });
  }
  ngOnInit(): void {
   this.onGetCategory();
  }
  open(){
    this.visible = true;
  }

  close(){
    this.visible = false;
    this.foodForm.reset();
  }
  onGetCategory(){
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.value.filter((x:Category) => x.Type == 2);
    })
  }
  save(){
    if(this.foodForm.invalid){
      this.foodForm.markAllAsTouched();
      return;
    }
      const data = {
    ...this.foodForm.value,
    CreatedAt: new Date()
  };
   this.productService.CreateProduct(data).subscribe((data) => {
    this.toastService.success("Thêm món ăn thành công!")
   })

    this.close();
  }

}