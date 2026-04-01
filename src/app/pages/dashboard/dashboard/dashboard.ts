import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../_services/signal-r.service';
import { TransactionComponent } from "../transaction/transaction";
import { ReportCost } from "../report-cost/report-cost";
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
@Component({
  selector: 'app-dashboard',
  imports: [TransactionComponent, FormsModule, CommonModule, ReportCost, NgxDaterangepickerMd, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
   selectedRange: any;
   form!: FormGroup;
 ranges: { [key: string]: [dayjs.Dayjs, dayjs.Dayjs] } = {
  Today: [dayjs(), dayjs()],
  'Last 7 Days': [dayjs().subtract(6, 'day'), dayjs()]
};
  constructor( private fb: FormBuilder) {}
ngOnInit(): void { 
  this.form = this.fb.group({
      range: [
        {
          startDate: dayjs().subtract(6, 'day'),
          endDate: dayjs()
        }
      ]
    });
}
}
