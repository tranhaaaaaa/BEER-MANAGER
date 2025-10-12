import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyFormatPipe } from 'src/app/core/helper/unity';
import { Product, Shop } from 'src/app/core/models/db.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-food-dialog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './food-dialog.html',
  styleUrl: './food-dialog.scss'
})
export class FoodDialog implements  OnInit, OnChanges{
  @Input() ProductId: any | undefined; 
  @Input() type: number | undefined; 
  @ViewChild('content') content: any; 
   @Output() closeDialog = new EventEmitter<void>();
  productForm: FormGroup;  
  productSelected: Product | undefined;
  public isLoading = false;
  constructor(
    private modalService: NgbModal,
    private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
      if(this.type === 0){
      this.productForm.reset(); 
    }
    this.productForm = new FormGroup({
      ProductName: new FormControl('', [Validators.required]), 
      Description: new FormControl(''), 
      ProductUid: new FormControl(''), 
      Price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), 
      Img: new FormControl(''), 
      Stock: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]), 
      ShopUid: new FormControl(''),
    });
  }
  onPriceChange(event: any) {
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ProductId'] && this.ProductId && this.type === 1) {
      this.loadProductData(); 
    }
    if(this.type === 0){
      this.productForm.reset(); 
    }
  }
  openModal(number : any) {
    this.productForm.reset(); 
    if (number === 1) {
      this.loadProductData(); 
    }
   setTimeout(() => {
     this.modalService.open(this.content);
   }, 1000);

  }

  onSubmit(modal: any) {
    if (this.productForm.valid) {
      if (!this.ProductId) {
        const productData = this.productForm.value;
      this.productForm.value.ShopUid = 'B9D44344-AFA5-4B76-A84D-2730FF637644';
      this.productService.CreateProduct(productData).subscribe((res) => {
        this.closeModal(modal); 
      });
      }else{
        const productData = this.productForm.value;
        this.productForm.value.ShopUid = 'B9D44344-AFA5-4B76-A84D-2730FF637644';
        this.productService.UpdateProduct(productData, this.ProductId).subscribe((res) => {
          this.closeModal(modal); 
        });
      }
    } else {
      console.log('Form is not valid!');
    }
  }

  closeModal(modal: any) {
    this.productForm.reset(); 
    this.closeDialog.emit();
    modal.dismiss('Close click'); 
  }

  loadProductData() {
    if (this.ProductId) {
      this.productService.getProductById(this.ProductId).subscribe((res) => {
        const product = res.value[0] as Product;
        if (product) {
          this.productForm.patchValue({
            ProductName: product.ProductName,
            Description: product.Description,
            Price: product.Price,
             ProductUid: product.ProductUid, 
            Img: product.Img,
            ShopUid :'B9D44344-AFA5-4B76-A84D-2730FF637644',
            Stock: product.Stock,
          });
        }
      });
    }
  }
}
