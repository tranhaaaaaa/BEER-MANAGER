import { Injectable } from '@angular/core';
import { Api } from './api';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenService extends Api{
    Login(formData: any): Observable<any> {
      let url = `/authentication/login`;
      return super.postEntity(url, formData).pipe(
        catchError((err) => throwError(() => new Error(err))),
        map((res) => {
          return res;
        })
      );
    }
}
