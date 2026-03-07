import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { PRODUCT } from './constant';
import { PaymentType } from '../../_dialog/payment-type/payment-type';
import { ModalCreateTable } from "../../_dialog/modal-create-table/modal-create-table";

@Component({
  selector: 'app-manager-food',
  imports: [CommonModule, PaymentType, ModalCreateTable],
  templateUrl: './manager-food.html',
  styleUrl: './manager-food.css',
})
export class ManagerFood {

categories = ["Tất cả","Đồ khô","Đồ mặn","Đồ nhậu"];

foods = PRODUCT;

orderItems:any[] = [];

activeCategory = "Tất cả";

showMobileOrder = false;
showDesktopOrder = true;
@ViewChild(ModalCreateTable) modalCreateTable! : ModalCreateTable;
@ViewChild(PaymentType) modal! : PaymentType;
toggleDesktopOrder(){
  this.showDesktopOrder = !this.showDesktopOrder;
}
onOpen(){
  this.modal.openModal();
}
get filteredFoods(){
  if(this.activeCategory === "Tất cả"){
    return this.foods;
  }
  return this.foods.filter(f => f.category === this.activeCategory);
}
createOrder(){
  this.modalCreateTable.open();
}
addToOrder(food:any){
  const exist = this.orderItems.find(x => x.id === food.id);

  if(exist){
    exist.quantity += 1;
  }else{
    this.orderItems.push({
      ...food,
      quantity:1
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
  return this.orderItems
  .reduce((sum,i)=>sum + i.price*i.quantity,0);
}
}
