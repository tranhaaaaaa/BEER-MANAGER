import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
      provideToastr(), 
      importProvidersFrom(BrowserModule,ToastrModule.forRoot(), 
      NgxDaterangepickerMd.forRoot({
        applyLabel: 'Áp dụng',
        cancelLabel: 'Hủy',
        clearLabel: 'Xóa',
        customRangeLabel: 'Tùy chỉnh',
        format: 'DD/MM/YYYY',
        firstDay: 1,
        daysOfWeek: ['CN','T2','T3','T4','T5','T6','T7'],
        monthNames: [
          'Tháng 1','Tháng 2','Tháng 3','Tháng 4',
          'Tháng 5','Tháng 6','Tháng 7','Tháng 8',
          'Tháng 9','Tháng 10','Tháng 11','Tháng 12'
        ]
      })
     ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }
  ],
  
};
