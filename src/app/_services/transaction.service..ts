import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';
import { JsonConvert } from 'json2typescript';
import { ODataResponse } from '../_models/data-response.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Transaction } from '../_models/db.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends Api {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllTransactions(): Observable<ODataResponse> {
    let url = '/transactions';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Transaction> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Transaction
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }
}
