import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ModalComponent, ModalFooterComponent, ModalModule } from '@coreui/angular';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PRODUCT } from '../../pages/manager-food/constant';
import { Category, Product } from '../../_models/db.model';
import { Products } from '../../_services/products';
import { PaymentType } from '../payment-type/payment-type';
import { TableService } from '../../_services/table.service';
import { OrderService } from '../../_services/order.service';
import { OrderItemService } from '../../_services/order-item.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_services/category.service';
import { ModalDebt } from '../modal-debt/modal-debt';
@Component({
  selector: 'app-modal-create-table',
  imports: [
    ModalComponent,
    ModalFooterComponent,
    ModalModule,
    ReactiveFormsModule,
    PaymentType,
    FormsModule,
    ModalDebt,
    CommonModule,
  ],
  templateUrl: './modal-create-table.html',
  styleUrl: './modal-create-table.css',
})
export class ModalCreateTable implements OnInit, OnChanges {
  visible = false;
  form!: FormGroup;
  listProducts: Product[] = [];
  @Input() ORDER_ID: any;
  @Input() ordersInput: any[] = [];
  table = {
    name: '',
    total: 0,
  };
  order: any;
  orders: any[] = [];
  public listCategory: Category[] = [];
  @Output() paymentSuccess = new EventEmitter<any>();
  @ViewChild(ModalDebt) modalDebt!: ModalDebt;
  @ViewChild(PaymentType) modal!: PaymentType;
  constructor(
    private fb: FormBuilder,
    private service: Products,
    private tableService: TableService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
  ) {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      ProductInfoDTOs: this.fb.array([]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ORDER_ID'] && this.ORDER_ID) {
      this.loadOrderItems();
    }
  }
  ngOnInit(): void {
    this.onGetData();
  }

  foods = PRODUCT;
  @Output() createTable = new EventEmitter<any>();
  onGetData() {
    this.service.getAllProduct().subscribe((data) => {
      this.listProducts = data.value;
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.listCategory = data.value.filter((x: Category) => x.Type == 1);
    });
  }
  onPaymentSuccess(data: any) {
    this.close();
    this.paymentSuccess.emit(data);
  }
  debtOrder() {
    this.modalDebt.open();
  }
  loadOrderItems() {
    if (this.ORDER_ID) {
      this.orderItemService
        .getOrderItemByQuery('/api/customapi/order-items/' + this.ORDER_ID)
        .subscribe((res) => {
          const order = res.Data;
          this.form.patchValue({
            Name: order.OrderName,
            Type: order.Type || '',
          });

          this.listOrder.clear();
          order.Items.forEach((item: any) => {
            this.listOrder.push(
              this.fb.group({
                name: item.Name,
                price: item.UnitPrice,
                qty: item.Quantity,
                id: item.ProductUid,
              }),
            );
          });
        });
    }
  }
  onOpenModal() {
    this.modal.openModal();
  }
  loadOrders() {
    this.listOrder.clear();
    this.ordersInput.forEach((o) => {
      this.listOrder.push(
        this.fb.group({
          name: o.ProductName,
          price: o.Price,
          qty: o.quantity,
          id: o.ProductUid,
        }),
      );
    });
  }
  open() {
    this.visible = true;
    console.log('ordersInput', this.ORDER_ID);
    if (this.ordersInput?.length) {
      this.loadOrders();
    }
  }
  getOrderGroup(control: any): FormGroup {
    return control as FormGroup;
  }
  get total() {
    return this.listOrder.value.reduce((sum: number, i: any) => sum + i.price * i.qty, 0);
  }
  get listOrder(): FormArray {
    return this.form.get('ProductInfoDTOs') as FormArray;
  }
  close() {
    this.visible = false;
  }
  addFood(food: any) {
    const index = this.listOrder.controls.findIndex((f: any) => f.value.name === food.ProductName);

    if (index > -1) {
      const item = this.listOrder.at(index);

      item.patchValue({
        qty: item.value.qty + 1,
      });
    } else {
      this.listOrder.push(
        this.fb.group({
          name: food.ProductName,
          price: food.Price,
          qty: 1,
          id: food.ProductUid,
        }),
      );
    }
  }
  increaseQty(index: number) {
    const item = this.listOrder.at(index);
    item.patchValue({
      qty: item.value.qty + 1,
    });
  }
  decreaseQty(index: number) {
    const item = this.listOrder.at(index);
    if (item.value.qty > 1) {
      item.patchValue({
        qty: item.value.qty - 1,
      });
    } else {
      this.listOrder.removeAt(index);
    }
  }
  updateQty(index: number) {
    if (this.orders[index].qty <= 0) {
      this.orders.splice(index, 1);
    }
  }
  get nameControl() {
    return this.form.get('Name');
  }
  get typeControl() {
    return this.form.get('Type');
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.ORDER_ID) {
      this.orderService.CreateOrder(this.form.value).subscribe((data) => {
        this.toastrService.success('Tạo đơn thành công!');
        this.close();
      });
    } else {
      this.orderService.UpdateOrder(this.form.value, this.ORDER_ID).subscribe((data) => {
        this.toastrService.success('Cập nhật đơn hàng thành công');
      });
    }
  }
  checkout() {
    console.log('Thanh toán', this.total);
  }
  submit() {
    if (!this.table.name) return;
    this.createTable.emit(this.table);
    this.table = {
      name: '',
      total: 0,
    };
    this.close();
  }
  inDebt() {
    if (this.ORDER_ID) {
      let formData = {
        Status: -1,
      };
      this.orderService.UpdateOrderStatus(formData, this.ORDER_ID).subscribe((data: any) => {
        this.toastrService.success('Cap nhat trang thai thanh cong');
      });
    }
  }
}
