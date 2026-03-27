// import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Access-Control-Allow-Origin': '*'
//   })
// }
// @Injectable({ providedIn: 'root' })
// export class HttpService {
//   currentUser: User;
//   constructor(
//     private http: HttpClient,
//     private authenticationService: any) {
//   }

//   getToken(): string {
//     return this.authenticationService.currentUserValue ? this.authenticationService.currentUserValue.tokenKey : '';
//   }
//   delete(url?: any, token?: any) {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
//     } else {
//       header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
//     }
//     return this.http.delete<any>(url, { headers: header });
//   }
//   put(url:any, params:any, token?: string): Observable<any> {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'token': token });
//     } else {
//       header = new HttpHeaders({ 'token': this.getToken() });
//     }
//     if (params) params['deviceId'] = localStorage.getItem('deviceId');
//     return this.http.put<any>(url, params, { headers: header });
//   }
//   deleteWithToken(url: any, body?: any, token?: string) {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'token': token });
//     } else {
//       header = new HttpHeaders({ 'token': this.getToken() });
//     }
//     if (body) {
//       const req = new HttpRequest('DELETE', url, body, { headers: header });
//       return this.http.request<any>(req);
//     } else {
//       return this.http.delete<any>(url, { headers: header });
//     }
//   }
//   get(url:any, token?: string, header?: any) {
//     let headers: any;
//     if (token) {
//       headers = new HttpHeaders({ 'token': token, ...header });
//     } else {
//       headers = new HttpHeaders({ 'token': this.getToken(), ...header });
//     }
//     return this.http.get<any>(url, { headers: headers });
//   }
//   getAccount(url:any, token?: string) {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'token': token, 'need-count': 'true' });
//     } else {
//       header = new HttpHeaders({ 'token': this.getToken(), 'need-count': 'true' });
//     }
//     return this.http.get<any>(url, { headers: header });
//   }
//   getAuthorization(url?: any, token?: any) {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
//     } else {
//       header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
//     }
//     return this.http.get<any>(url, { headers: header });
//   }
//   postAuthorization(url?: any, params?: any, token?: any, header?: any) {
//     let headers: any;
//     if (token) {
//       headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token, ...header });
//     } else {
//       headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken(), ...header });
//     }
//     return this.http.post<any>(url, params, { headers: headers });
//   }

//   putAuthorization(url?: any, params?: any) {
//     const header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
//     return this.http.put<any>(url, params, { headers: header });
//   }

// fetch(url?: any, method?: any, params?: any, userToken?: any) {

//   let header: Record<string, string> = {
//     'Content-Type': 'application/json'
//   };

//   let token = this.getToken();

//   if (!userToken) {
//     header['Authorization'] = 'Bearer ' + token;
//   } else {
//     header['token'] = token;
//   }

//   return fetch(url, {
//     method: method ?? 'GET',
//     body: params ? JSON.stringify(params) : null,
//     headers: header,
//   }).then(resp => resp.json());
// }

//   post(url:any, params:any, token?: string): Observable<any> {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'token': token });
//     } else {
//       header = new HttpHeaders({ 'token': this.getToken() });
//     }
//     if (params) params['deviceId'] = localStorage.getItem('deviceId') ? localStorage.getItem('deviceId') : '';
//     return this.http.post<any>(url, params, { headers: header });
//   }
//   postDefault(url: string, params: any): Observable<any> {
//     const headers = new HttpHeaders({ 'accept': 'application/json', 'Content-Type': 'application/json' });
//     return this.http.post<any>(url, params, { headers });
//   }

//   postNoDevice(url:any, params:any): Observable<any> {
//     const header = new HttpHeaders({ 'Token': this.getToken(), 'Content-Type': 'application/json' });
//     return this.http.post<any>(url, params, { headers: header });
//   }

//   async getAccountInfo(url:any, token:any, tokenSso:any) {
//     const header = new HttpHeaders({ 'token': token });
//     const param = { "TokenSSO": tokenSso };
//     const users = await this.http.post<any>(url, param, { headers: header }).toPromise();
//     // const avatar = await this.http.post<any>(AppSettings.URL_GET_AVATAR, {},{ headers: header }).toPromise();
//     if (users && users.data) {
//       let userInfo = users.data;
//       if (userInfo['EMAIL'] && userInfo['EMAIL'].indexOf('@viettelpost.vn') != -1) {
//         userInfo['EMAIL'] = '';
//       }
//       /*if (!avatar.error && avatar.data) {
//         userInfo.AVATAR = avatar.data.AVATAR_STRING;
//       }*/
//       this.authenticationService.setUserInfo(userInfo);
//     }
//   }

//   getNoToken(url:any): Observable<any> {
//     return this.http.get<any>(url);
//   }

//   onSuccess(res?: any): boolean {
//     return res && res.error === false;
//   }

//   postFico(url:any, params:any, token?: string): Observable<any> {
//     let header: any;
//     if (token) {
//       header = new HttpHeaders({ 'VerificationToken': token });
//     } else {
//       header = new HttpHeaders({ 'VerificationToken': '23422a173c8e4cba07fd4f1daa9cd5c09187ea682993af18a34a950e45376a71' });
//     }
//     if (params) params['deviceId'] = localStorage.getItem('deviceId');
//     return this.http.post<any>(url, params, { headers: header });
//   }

//   postMultipart(url: string, params: FormData, token?: string): Observable<any> {
//     let _token: string = token ? token : this.getToken();
//     let headers: any = new HttpHeaders({ 'token': _token });
//     headers.append('Content-Type', 'multipart/form-data')
//     headers.append('enctype', 'multipart/form-data')
//     return this.http.post<any>(url, params, { headers: headers });
//   }
// }
