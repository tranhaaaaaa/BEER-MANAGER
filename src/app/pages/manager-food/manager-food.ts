import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PRODUCT } from './constant';
import { PaymentType } from '../../_dialog/payment-type/payment-type';
import { ModalCreateTable } from "../../_dialog/modal-create-table/modal-create-table";
import { Products } from '../../_services/products';
import { Product } from '../../_models/db.model';

@Component({
  selector: 'app-manager-food',
  imports: [CommonModule, PaymentType, ModalCreateTable],
  templateUrl: './manager-food.html',
  styleUrl: './manager-food.css',
})
export class ManagerFood implements OnInit{
categories = ["Tất cả","Đồ khô","Đồ mặn"];
foods = PRODUCT;
listProduct : Product[]=[];
orderItems:any[] = [];
activeCategory = "Tất cả";
showMobileOrder = false;
showDesktopOrder = true;
@ViewChild(ModalCreateTable) modalCreateTable! : ModalCreateTable;
@ViewChild(PaymentType) modal! : PaymentType;
constructor(private service : Products){}
  ngOnInit(): void {
   this.onGetData();
  }
  onGetData(){
    this.service.getAllProduct().subscribe((data) =>{
      this.listProduct= data.value;
      console.log("this.listproduct", this.listProduct);
    })
  }
toggleDesktopOrder(){
  this.showDesktopOrder = !this.showDesktopOrder;
}
onOpen(){
  this.modal.openModal();
}
get filteredProducts(){

  if(this.activeCategory === "Tất cả"){
    return this.listProduct;
  }

  return this.listProduct.filter(p =>
    p.Type === this.mapCategory(this.activeCategory)
  );

}
mapCategory(name:string){

  if(name === "Đồ khô") return 1;
  if(name === "Đồ mặn") return 2;
  // if(name === "Đồ nhậu") return 3;

  return 0;

}
createOrder(){
  this.modalCreateTable.open();
}
addToOrder(product: Product){

  const exist = this.orderItems
    .find(x => x.ProductUid === product.ProductUid);

  if(exist){

    exist.quantity += 1;

  }else{

    this.orderItems.push({
      ProductUid: product.ProductUid,
      ProductName: product.ProductName,
      Price: product.Price,
      Img: product.Img,
      quantity: 1
    });

  }

}
increase(item:any){
  item.quantity++;
}
decrease(item:any){
  item.quantity--;

  if(item.quantity <= 0){
    this.orderItems =
      this.orderItems.filter(x => x.id !== item.id);
  }
}
toggleMobileOrder(){
  this.showMobileOrder = !this.showMobileOrder;
}
get totalPrice(){

  return this.orderItems.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );
}
}
