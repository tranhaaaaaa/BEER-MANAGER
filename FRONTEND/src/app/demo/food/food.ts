import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FoodDialog } from 'src/app/_dialog/food-dialog/food-dialog';
import { Product } from 'src/app/core/models/db.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-food',
  imports: [CommonModule,FoodDialog,NgxSpinnerModule],
  templateUrl: './food.html',
  styleUrl: './food.scss'
})
export class Food implements OnInit {
  public listProduct: Product[] = [];
  public isLoading = false;
  public productSelected: Product | undefined;
  type: number | undefined; 
  @ViewChild(FoodDialog) childModal: FoodDialog | undefined;  

  constructor(private readonly productService: ProductService,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.onGetData();  
  }
onClose() {
    this.activeModal.close(); // Đóng modal
  }

  onSave() {
    this.activeModal.close(this.listProduct); // Lưu và đóng modal
  }
  onEditProduct(item: Product) {
    this.spinner.show();
    this.productSelected = item;  
    this.type = 1; 
    this.childModal?.openModal(1);  
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  onCloseModal() {
     this.onGetData();  
  }
  onGetData() {
    this.productService.getAllProduct().subscribe((res) => {
    this.spinner.show();
      this.listProduct = res.value as Product[];
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

  openChildModal() {
    this.type = 0;  
    this.productSelected = undefined;  
    this.spinner.show();
    this.childModal?.openModal(0);  
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}