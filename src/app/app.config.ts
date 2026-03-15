import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
      provideToastr(), 
      importProvidersFrom(BrowserModule,ToastrModule.forRoot()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }
  ]
};
