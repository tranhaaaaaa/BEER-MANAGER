// import { Injectable } from '@angular/core';
// import { AppSettings } from './app.config';
// import { HttpService } from './http.service';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { ModalService } from './modal.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CommitedOutputService {
//   constructor(protected httpService: HttpService) { }

//   getFilterService() {
//     return this.httpService.getAuthorization(AppSettings.API_GET_COMMITED_OUTPUT_SERVICE);
//   }

//   getCommitedOutput(params: { period: string; service: string }) {
//     return this.httpService.getAuthorization(
//       AppSettings.API_GET_COMMITED_OUTPUT + `?thoiGianBaoCao=${params.period}&dichVu=${params.service}`
//     );
//   }
//   getCommitedOutputChart(params: { period: string; service: string }) {
//     return this.httpService.getAuthorization(
//       AppSettings.API_GET_COMMITED_OUTPUT_CHART + `?thoiGianBaoCao=${params.period}&dichVu=${params.service}`
//     );
//   }
//   getHasDataCommitedOutput(params: { period: string }) {
//     return this.httpService.getAuthorization(
//       AppSettings.API_GET_HAS_DATA_COMMITED_OUTPUT_CHART + `?thoiGianBaoCao=${params.period}`
//     );
//   }
// }
