import { Injectable } from '@angular/core';
import { Api } from './api';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { ODataResponse } from '../_models/data-response.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category } from '../_models/db.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends Api {
  constructor(protected override http: HttpClient) {
    super(http);
    this.jsonConvert = new JsonConvert();
  }

  getAllCategories(): Observable<ODataResponse> {
    let url = '/Categories';
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),

      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Category
        );
        odataRes.value = value;

        return odataRes;
      })
    );
  }

  getCategoriesById(Id: any): Observable<ODataResponse> {
    let url = `/Categories?$filter=Id eq ${Id}
`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odateRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          odateRes.value,
          Category
        );
        odateRes.value = value;
        return odateRes;
      })
    );
  }

  CreateCategories(formData: any): Observable<Category> {
    let url = `/Categories`;
    return super.postEntity(url, formData).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        return res;
      })
    );
  }

  UpdateCategories(formData: any, Id: any): Observable<Category> {
    let url = `/Categories`;
  return super.patchEntity(url, Id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
  }

  DeleteCategories(id: any): Observable<Category> {
    return super.deleteEntity('/Categories', id).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getCategoriesByQuery(queryParams?: string): Observable<ODataResponse> {
    let url = `/Categories?${queryParams}`;
    return super.get(url).pipe(
      catchError((err) => throwError(() => new Error(err))),
      map((res) => {
        const odataRes: ODataResponse = this.jsonConvert.deserializeObject(
          res,
          ODataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          odataRes.value,
          Category
        );
        odataRes.value = value;
        return odataRes;
      })
    );
  }
}