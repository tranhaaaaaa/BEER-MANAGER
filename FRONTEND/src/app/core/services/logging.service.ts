import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ODataResponse } from '../models/odata-response.model';
import { Logging } from '../models/db.model';

@Injectable({
  providedIn: 'root',
})
export class LoggingService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllLogging(): Observable<ODataResponse> {
    let url = '/Loggings?$Orderby=Id DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Logging> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Logging
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getLoggingById(Id: any): Observable<ODataResponse> {
    let url = `/Loggings?$filter=Id eq ${Id}&$expand=UserU
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Logging> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Logging
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateLogging(formData: any): Observable<Logging> {
    let url = `/Loggings`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateLogging(formData: any, Id: any): Observable<Logging> {
    let url = `/Loggings`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteLogging(id: any): Observable<Logging> {
    return super.deleteEntity('/Loggings', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getLoggingByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Loggings?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Logging> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Logging
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}
