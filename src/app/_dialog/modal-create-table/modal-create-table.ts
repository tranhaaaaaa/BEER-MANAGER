import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {ModalComponent, ModalFooterComponent, ModalModule } from '@coreui/angular';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PRODUCT } from '../../pages/manager-food/constant';
import { Product } from '../../_models/db.model';
import { Products } from '../../_services/products';
import { PaymentType } from "../payment-type/payment-type";
@Component({
  selector: 'app-modal-create-table',
  imports: [ModalComponent, ModalFooterComponent, ModalModule, ReactiveFormsModule, PaymentType,FormsModule,CommonModule],
  templateUrl: './modal-create-table.html',
  styleUrl: './modal-create-table.css',
})
export class ModalCreateTable implements OnInit{
 visible = false;
form!: FormGroup;
listProducts : Product[]=[];
@Input() orderId : any;
@Input() ordersInput: any[] = [];
  table = {
    name: '',
    total: 0
  };
orders:any[] = [];
@ViewChild(PaymentType) modal! : PaymentType;
constructor(private fb: FormBuilder,private service : Products) {
  this.form = this.fb.group({
    name: ['',Validators.required],
    orders: this.fb.array([])
  });
}
  ngOnInit(): void {
   this.onGetData();
  }
foods = PRODUCT;
  @Output() createTable = new EventEmitter<any>();
  onGetData(){
    this.service.getAllProduct().subscribe((data) => {
      this.listProducts = data.value;
    })
  }
  onOpenModal(){
    this.modal.openModal();
  }
loadOrders() {
  this.listOrder.clear();
  this.ordersInput.forEach(o => {
    this.listOrder.push(
      this.fb.group({
        name: o.ProductName,
        price: o.Price,
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
    (f:any) => f.value.name === food.ProductName
  );
  if (index > -1) {
    const item = this.listOrder.at(index);
    item.patchValue({
      qty: item.value.qty + 1
    });
  } else {
    this.listOrder.push(
      this.fb.group({
        name: food.ProductName,
        price: food.Price,
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
get nameControl() {
  return this.form.get('name');
}
save() {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  console.log("Lưu bàn", this.form.value);

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