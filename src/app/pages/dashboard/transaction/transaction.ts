import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../_models/db.model';
import { TransactionService } from '../../../_services/transaction.service.';
import { CardBodyComponent, CardComponent, CardHeaderComponent, TableModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../_services/http.service';

@Component({
  selector: 'app-transaction',
  imports: [TableModule,CommonModule,FormsModule,CardBodyComponent,CardComponent,CardHeaderComponent],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css',
})
export class TransactionComponent implements OnInit,OnChanges{
  public listTransaction : Transaction[]=[];
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  currentPage: number = 1;
pageSize: number = 10;
  constructor(private service: TransactionService,
    private httpService : HttpService
  ){}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['startDate'] || changes['endDate']) {
   this.GetDataTable();

  }
}
  ngOnInit(): void {
  }
 GetDataTable(){
  this.httpService.get(`/Transactions?$filter=TransactionDate ge ${this.startDate}T00:00:00Z and TransactionDate lt ${this.endDate}T00:00:00Z`).subscribe((data: any) => {
    this.listTransaction = data.value
      .sort((a: any, b: any) => {
        return new Date(b.TransactionDate).getTime() - new Date(a.TransactionDate).getTime();
      });

    console.log("transaction:", this.listTransaction);
  });
}
  get pagedTransactions(): Transaction[] {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.listTransaction.slice(start, start + this.pageSize);
}

get totalPages(): number {
  return Math.ceil(this.listTransaction.length / this.pageSize);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}
}
