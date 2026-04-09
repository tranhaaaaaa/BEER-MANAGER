import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../_services/signal-r.service';
import { TransactionComponent } from "../transaction/transaction";
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import utc from 'dayjs/plugin/utc';
import { OrderHistory } from '../order-history/order-history';
import { ReportForMonth } from "../report-for-month/report-for-month";
import { ReportForDay } from '../report-for-day/report-for-day';


dayjs.extend(utc);

@Component({
  selector: 'app-dashboard',
  imports: [
    TransactionComponent,
    FormsModule,
    CommonModule,
    OrderHistory,
    NgxDaterangepickerMd,
    ReactiveFormsModule,
    ReportForDay
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  selectedRange: any;

  form!: FormGroup;

  // 👇 thêm 2 form mới
  monthYearForm!: FormGroup;
  yearForm!: FormGroup;

  // 👇 list tháng
  months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 👇 list năm (auto generate)
  years: number[] = [];

  ranges: { [key: string]: [dayjs.Dayjs, dayjs.Dayjs] } = {
    Today: [dayjs(), dayjs()],
    'Last 7 Days': [dayjs().subtract(6, 'day'), dayjs()]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();

    // generate list year từ 2022 → hiện tại
    for (let i = 2022; i <= currentYear; i++) {
      this.years.push(i);
    }

    // date range picker
    this.form = this.fb.group({
      range: [
        {
          startDate: dayjs().subtract(6, 'day'),
          endDate: dayjs()
        }
      ]
    });

    // form tháng + năm
    this.monthYearForm = this.fb.group({
      month: [currentDate.getMonth() + 1],
      year: [currentYear]
    });

    // form năm
    this.yearForm = this.fb.group({
      year: [currentYear]
    });

    // debug log
    this.form.get('range')?.valueChanges.subscribe((value) => {

      const startDate = value.startDate.format('YYYY-MM-DD');
      const endDate = value.endDate.format('YYYY-MM-DD');

      console.log('Formatted:', startDate, endDate);

    });

  }

}