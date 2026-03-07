import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {ModalComponent, ModalFooterComponent, ModalModule } from '@coreui/angular';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PRODUCT } from '../../pages/manager-food/constant';
@Component({
  selector: 'app-modal-create-table',
  imports: [ModalComponent,ModalFooterComponent,ModalModule,CommonModule,ReactiveFormsModule],
  templateUrl: './modal-create-table.html',
  styleUrl: './modal-create-table.css',
})
export class ModalCreateTable {
 visible = false;
form!: FormGroup;
@Input() ordersInput: any[] = [];
  table = {
    name: '',
    total: 0
  };
orders:any[] = [];
constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    name: [''],
    orders: this.fb.array([])
  });
}
foods = PRODUCT;
  @Output() createTable = new EventEmitter<any>();
loadOrders() {
  this.listOrder.clear();
  this.ordersInput.forEach(o => {
    this.listOrder.push(
      this.fb.group({
        name: o.name,
        price: o.price,
        qty: o.quantity   
      })
    );
  });
}
  open() {
    this.visible = true;  
    console.log("ordersInput",this.ordersInput)
    if(this.ordersInput?.length){
    this.loadOrders();
  }
  }
  getOrderGroup(control:any): FormGroup {
  return control as FormGroup;
}
get total() {
  return this.listOrder.value.reduce(
    (sum: number, i: any) => sum + i.price * i.qty,
    0
  );
}
get listOrder(): FormArray {
  return this.form.get('orders') as FormArray;
}
  close() {
    this.visible = false;
  }
  addFood(food: any) {
  const index = this.listOrder.controls.findIndex(
    (f:any) => f.value.name === food.name
  );
  if (index > -1) {
    const item = this.listOrder.at(index);
    item.patchValue({
      qty: item.value.qty + 1
    });
  } else {
    this.listOrder.push(
      this.fb.group({
        name: food.name,
        price: food.price,
        qty: 1
      })
    );
  }
}
increaseQty(index: number) {
  const item = this.listOrder.at(index);
  item.patchValue({
    qty: item.value.qty + 1
  });
}
decreaseQty(index: number) {
  const item = this.listOrder.at(index);
  if (item.value.qty > 1) {

    item.patchValue({
      qty: item.value.qty - 1
    });

  } else {

    this.listOrder.removeAt(index);
  }
}
updateQty(index:number){

  if(this.orders[index].qty <= 0){
    this.orders.splice(index,1)
  }
}
save(){
  console.log("Lưu bàn",this.listOrder.value)
}
checkout(){
  console.log("Thanh toán",this.total)
}
  submit() {
    if (!this.table.name) return;
    this.createTable.emit(this.table);
    this.table = {
      name: '',
      total: 0
    };
    this.close();
  }

}