import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PRODUCT } from './constant';
import { PaymentType } from '../../_dialog/payment-type/payment-type';
import { ModalCreateTable } from '../../_dialog/modal-create-table/modal-create-table';
import { Products } from '../../_services/products';
import { Product } from '../../_models/db.model';
import { Category } from '../../_models/db.model';
import { CategoryService } from '../../_services/category.service';
import { ModalFood } from '../../_dialog/modal-food/modal-food';

@Component({
  selector: 'app-manager-food',
  imports: [CommonModule, PaymentType, ModalCreateTable, ModalFood],
  templateUrl: './manager-food.html',
  styleUrl: './manager-food.css',
})
export class ManagerFood implements OnInit {
  categories: Category[] = [];
  currentCategory: string | null = null;
  foods = PRODUCT;
  listProduct: Product[] = [];
  orderItems: any[] = [];
  activeCategory: string | 'all' = 'all';
  showMobileOrder = false;
  showDesktopOrder = true;
  @ViewChild(ModalCreateTable) modalCreateTable!: ModalCreateTable;
  @ViewChild(PaymentType) modal!: PaymentType;
  @ViewChild(ModalFood) modalAddFood!: ModalFood;
  constructor(
    private service: Products,
    private categoryService: CategoryService,
  ) {}
  ngOnInit(): void {
    this.onGetData();
  }
  onGetData() {
    this.service.getAllProduct().subscribe((data) => {
      this.listProduct = data.value;
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.value.filter((x: any) => x.Type == 2);
    });
  }

  toggleDesktopOrder() {
    this.showDesktopOrder = !this.showDesktopOrder;
  }
  openAddFood() {
    this.modalAddFood.open();
  }
  onOpen() {
    this.modal.openModal();
  }
  get filteredProducts() {
    if (this.activeCategory === 'all') {
      return this.listProduct;
    }

    return this.listProduct.filter((p) => p.Category === this.activeCategory);
  }
  createOrder() {
    this.modalCreateTable.open();
  }
  addToOrder(product: Product) {
    const exist = this.orderItems.find((x) => x.ProductUid === product.ProductUid);

    if (exist) {
      exist.quantity += 1;
    } else {
      this.orderItems.push({
        ProductUid: product.ProductUid,
        ProductName: product.ProductName,
        Price: product.Price,
        Img: product.Img,
        quantity: 1,
      });
    }
  }
  increase(item: any) {
    item.quantity++;
  }
  decrease(item: any) {
    item.quantity--;

    if (item.quantity <= 0) {
      this.orderItems = this.orderItems.filter((x) => x.id !== item.id);
    }
  }
  toggleMobileOrder() {
    this.showMobileOrder = !this.showMobileOrder;
  }
  get totalPrice() {
    return this.orderItems.reduce((sum, item) => sum + item.Price * item.quantity, 0);
  }
  onRefresh(){
    this.onGetData();
  }
}
