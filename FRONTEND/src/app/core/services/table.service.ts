import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { ODataResponse } from '../models/odata-response.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Table } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class TableService extends ApiService {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllTable(): Observable<ODataResponse> {
    let url = '/Tables?$Orderby=TableId DESC';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Table> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Table
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getTableById(Id: any): Observable<ODataResponse> {
    let url = `/Tables?$filter=TableId eq ${Id}
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Table> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Table
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateTable(formData: any): Observable<Table> {
    let url = `/Tables`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateTable(formData: any, Id: any): Observable<Table> {
    let url = `/Tables`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteTable(id: any): Observable<Table> {
    return super.deleteEntity('/Tables', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getTableByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Tables?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Table> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Table
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}

