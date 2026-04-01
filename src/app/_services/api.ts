import { ChangeDetectorRef, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_SERVICE, environment } from '../../environments/environment';
import { JsonConvert } from 'json2typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogged } from '../_helper/userLogged';
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
  protected getHeaders(): { [header: string]: string } {
    const headers: any = {
      'Accept': 'application/json',
    };

    const userLogged = new UserLogged();
    if (userLogged.isLogged()) {
      headers['Authorization'] = 'Bearer ' + userLogged.getToken();
    }
    return headers;
  }

  //Post
  protected post(
    url: string,
    body: any,
    contentType: string = 'application/json'
  ) {
    const options: any = {};
    options['headers']['Content-Type'] = contentType;
      options['headers'] = this.getHeaders();
    return this.http.post(API_SERVICE.BASE_URL + url, body, options);
  }
  //Get
  protected get(url: string, params: any = null): Observable<Object> {
    params = params || {};
    const options = {
      params,
    };
    // @ts-ignore
     options['headers'] = this.getHeaders();
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
    options['headers'] = this.getHeaders()
    options['headers']['Content-Type'] = contentType;
    return this.http.patch(API_SERVICE.BASE_URL + url, body, options);
  }
  //post
  protected postEntity(entitySet: string, body: Object = {}): Observable<any> {
    const options: any = {};
      options['headers'] = this.getHeaders();
    return this.http
      .post(`${API_SERVICE.BASE_URL}${entitySet}`, body, options)
      .pipe(catchError(this.formatErrors));
  }

  protected putEntity(
    entitySet: string,
    id: number,
    body: Object = {}
  ): Observable<any> {
    const options: any = {};;
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
     options['headers'] = this.getHeaders()
    return this.http
      .put(`${API_SERVICE.BASE_URL}${entitySet}/${id}`, body, options)
      .pipe(catchError(this.formatErrors));
  }
  protected patchEntity(
    entitySet: string,
    id: number,
    body: Object = {}
  ): Observable<any> {
     const options: any = {};
    options['headers'] = this.getHeaders();
    let header: any = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return this.http
      .patch(`${API_SERVICE.BASE_URL}${entitySet}/${id}`, body, options)
      .pipe(catchError(this.formatErrors));
  }
  protected deleteEntity(entitySet: string, id: number): Observable<any> {
    const options: any = {};
    return this.http
      .delete(`${API_SERVICE.BASE_URL}${entitySet}/${id}`, options)
      .pipe(catchError(this.formatErrors));
  }
}
