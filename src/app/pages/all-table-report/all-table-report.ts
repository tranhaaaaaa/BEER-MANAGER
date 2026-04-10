import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../_services/http.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { BadgeModule, CardModule, GridModule, TableDirective, TableModule } from '@coreui/angular';
import { TableService } from '../../_services/table.service';
import { IconModule } from '@coreui/icons-angular';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import moment from 'moment';
import dayjs from 'dayjs';
import { ModalInvoiceDisplay } from '../../_dialog/modal-invoice-display/modal-invoice-display';

@Component({
  selector: 'app-all-table-report',
  standalone: true,
  imports: [
    InfiniteScrollModule,
    CommonModule,
    TableModule,
    CardModule,
    GridModule,
    IconModule,
    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd,
    ModalInvoiceDisplay
  ],
  templateUrl: './all-table-report.html',
  styleUrl: './all-table-report.css',
})
export class AllTableReport implements OnInit {
  tableOrders: any[] = [];
  totalRevenue = 0;
  page = 1;
  pageSize = 10;
  loading = false;
  hasMore = true;
  ORDERID: any;
  @ViewChild(ModalInvoiceDisplay) modalInvoiceDisplay!: ModalInvoiceDisplay;
  filterStatus: number | null = null;
  sortOrder: 'asc' | 'desc' = 'desc';
  dateRangeForm: FormGroup;
  ranges: any = {
    'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
    'Hôm qua': [
      moment().subtract(1, 'day').startOf('day'),
      moment().subtract(1, 'day').endOf('day'),
    ],
    '7 ngày qua': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
    '30 ngày qua': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
    'Tháng này': [moment().startOf('month'), moment().endOf('month')],
      'Năm nay': [
    moment().startOf('year'),
    moment().endOf('year')
  ]
  };
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
  ) {
    this.dateRangeForm = this.fb.group({
      ranges: [
        {
          startDate: moment().subtract(6, 'days').startOf('day'),
          endDate: moment().endOf('day'),
        },
      ],
    });
  }
  viewDetail(table: any) {
    this.ORDERID = table.orderId;
    this.modalInvoiceDisplay.openModal();
  
}
  ngOnInit(): void {
    const todayRange = {
      startDate: moment().subtract(6, 'days').startOf('day'),
      endDate: moment().endOf('day'),
    };
    this.dateRangeForm.get('ranges')?.setValue(todayRange);
    this.onDateRangeChange(todayRange);
    this.dateRangeForm.get('ranges')?.valueChanges.subscribe((range: any) => {
      if (range?.startDate && range?.endDate) {
        this.onDateRangeChange(range);
      }
    });
    this.loadTables();
  }
  onDateRangeChange(range: any) {
    this.selectedStartDate = range.startDate.format('YYYY-MM-DD');
    this.selectedEndDate = range.endDate.format('YYYY-MM-DD');
    this.resetAndReload();
  }
  resetAndReload() {
    this.page = 1;
    this.hasMore = true;
    this.tableOrders = [];
    this.totalRevenue = 0;
    this.loadTables();
  }

  loadTables() {
    if (this.loading || !this.hasMore) return;
    this.loading = true;
    const body: any = {
      Page: this.page,
      PageSize: this.pageSize,
      status: this.filterStatus,
      today: false,
      FromDate: this.selectedStartDate,
      ToDate: this.selectedEndDate,
    };
    this.httpService.post('/api/customapi/table-orders', body).subscribe({
      next: (res: any) => {
        this.tableOrders = [...this.tableOrders, ...res.data];
        this.totalRevenue = this.tableOrders.reduce((sum, item) => sum + item.totalAmount, 0);
        if (this.page >= res.totalPages) {
          this.hasMore = false;
        }
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
  onScroll() {
    this.loadTables();
  }
}
