import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../../../_services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-for-day',
  imports: [CommonModule],
  templateUrl: './report-for-day.html',
  styleUrl: './report-for-day.css',
})
export class ReportForDay implements OnChanges {

  @Input() month: number = 0;
  @Input() year: number = 0;
totalRevenue = 0;
maxRevenueDay = 0;
minRevenueDay = 0;
  reportData: any = {};
  chartData: { day: number, value: number }[] = [];

  maxValue = 0;

  constructor(private httpService: HttpService) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (this.month && this.year) {
      this.loadData();
    }

  }

loadData() {

  this.httpService
    .get(`/api/Report/total-amount-in-day?month=${this.month}&year=${this.year}`)
    .subscribe((data: any) => {

      this.reportData = data;

      this.chartData = Object.keys(data).map(day => ({
        day: Number(day),
        value: Number(data[day])
      }));

      const values = Object.values(data).map(Number);

      this.maxValue = Math.max(...values, 1);

      // tổng doanh thu tháng
      this.totalRevenue = values.reduce((a, b) => a + b, 0);

      // ngày cao nhất
      this.maxRevenueDay = this.chartData.reduce((a, b) =>
        a.value > b.value ? a : b
      ).day;

      // ngày thấp nhất
      this.minRevenueDay = this.chartData.reduce((a, b) =>
        a.value < b.value ? a : b
      ).day;

    });

}
}