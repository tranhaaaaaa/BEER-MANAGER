import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, Table } from 'src/app/core/models/db.model';
import { TableService } from 'src/app/core/services/table.service';
import { Food } from "../food/food";
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-table-used',
  imports: [CommonModule],
  templateUrl: './table-used.html',
  styleUrl: './table-used.scss'
})
export class TableUsed implements OnInit{
  public listTable: Table[] = [];
  public isLoading = false
  public dau_phai: Table = new Table();
  public dau_trai: Table = new Table();
  public giua_phai: Table = new Table();
  public giua_trai: Table = new Table();
  public cuoi_phai: Table = new Table();
  public cuoi_trai: Table = new Table();
  public dau_ao_phai: Table = new Table();
  public dau_ao_trai: Table = new Table()
  public cuoi_ao_phai: Table = new Table();
  public cuoi_ao_trai: Table = new Table()
  public giua_ao_phai: Table = new Table();
  public giua_ao_trai: Table = new Table()
  public hien = new Table();
  public dau_buc = new Table();
  public cuoi_buc = new Table();
  public listProduct : Product[]=[];
  constructor(private tableService : TableService,
    private productService: ProductService,
  ) {}
  ngOnInit(): void {
  this.onGetData();
  }
  onGetData() {
    this.isLoading = true;
    this.tableService.getAllTable().subscribe((res) => {
      this.listTable = res.value as Table[];
      this.dau_phai = this.listTable.find(x => x.Name === 'Đầu phải') as Table;
      this.dau_trai = this.listTable.find(x => x.Name === 'Đầu trái') as Table;
      this.giua_phai = this.listTable.find(x => x.Name === 'Giữa phải') as Table;
      this.giua_trai = this.listTable.find(x => x.Name === 'Giữa trái') as Table;
      this.cuoi_phai = this.listTable.find(x => x.Name === 'Cuối phải') as Table;
      this.cuoi_trai = this.listTable.find(x => x.Name === 'Cuối trái') as Table;
      this.dau_ao_phai = this.listTable.find(x => x.Name === 'Đầu ao phải') as Table;
      this.dau_ao_trai = this.listTable.find(x => x.Name === 'Đầu ao trái') as Table;
      this.cuoi_ao_phai = this.listTable.find(x => x.Name === 'Cuối ao phải') as Table;
      this.cuoi_ao_trai = this.listTable.find(x => x.Name === 'Cuối ao trái') as Table;
      this.giua_ao_phai = this.listTable.find(x => x.Name === 'Giữa ao phải') as Table;
      this.giua_ao_trai = this.listTable.find(x => x.Name === 'Giữa ao trái') as Table;
      this.hien = this.listTable.find(x => x.Name === 'Hiên') as Table;
      this.dau_buc = this.listTable.find(x => x.Name === 'Đầu bục') as Table;
      this.cuoi_buc = this.listTable.find(x => x.Name === 'Cuối bục') as Table;
    });
     this.productService.getAllProduct().subscribe((res) => {
      this.listProduct = res.value as Product[];
      this.isLoading = false;

    });
  }
 
}
