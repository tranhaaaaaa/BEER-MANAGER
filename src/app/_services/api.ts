import { ChangeDetectorRef, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_SERVICE, environment } from '../../environments/environment.development';
import { JsonConvert } from 'json2typescript';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Api {
   protected jsonConvert: JsonConvert;
  protected changeDetectorRef: ChangeDetectorRef | undefined;

  constructor(protected http: HttpClient) {
    this.jsonConvert = new JsonConvert();
  }
  private formatErrors(error: any) {
    return throwError(() => error);
  }

  //Post
  protected post(
    url: string,
    body: any,
    contentType: string = 'application/json'
  ) {
    const options: any = {};
    options['headers']['Content-Type'] = contentType;
    return this.http.post(API_SERVICE.BASE_URL + url, body, options);
  }
  //Get
  public get(url: any, params: any = null): Observable<Object> {
    params = params || {};
    const options: any = {
      params,
    };
    return this.http.get(API_SERVICE.BASE_URL + url, options);
  }
  protected postFile(url: string, body: any): Observable<any> {
    const options: any = {};
    options['headers'] = {};
    return this.http.post(API_SERVICE.BASE_URL + url, body, options);
  }
  //Patch
  protected patch(
    url: string,
    body: any,
    contentType: string = 'application/json'
  ) {
    const options: any = {};
    options['headers']['Content-Type'] = contentType;
    return this.http.patch(API_SERVICE.BASE_URL + url, body, options);
  }
  //post
  protected postEntity(entitySet: string, body: Object = {}): Observable<any> {
    const options: any = {};
    return this.http
      .post(`${API_SERVICE.BASE_URL}${entitySet}`, body, options)
      .pipe(catchError(this.formatErrors));
  }

  protected putEntity(
    entitySet: string,
    id: number,
    body: Object = {}
  ): Observable<any> {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.http
      .put(`${API_SERVICE.BASE_URL}${entitySet}/${id}`, body, headers)
      .pipe(catchError(this.formatErrors));
  }
  protected patchEntity(
    entitySet: string,
    id: number,
    body: Object = {}
  ): Observable<any> {
    let header: any = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.http
      .patch(`${API_SERVICE.BASE_URL}${entitySet}/${id}`, body, header)
      .pipe(catchError(this.formatErrors));
  }
  protected deleteEntity(entitySet: string, id: number): Observable<any> {
    const options: any = {};
    return this.http
      .delete(`${API_SERVICE.BASE_URL}${entitySet}/${id}`, options)
      .pipe(catchError(this.formatErrors));
  }
}
