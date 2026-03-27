import { first, last } from "rxjs";

export class UserLogged {
    private readonly TOKENKEY: string = 'token';
    private readonly UserNameKey: string = 'userName';
    private readonly userIdKey: string = 'userId';
    constructor() {
      this.TOKENKEY = 'token';
      this.userIdKey = 'userId';
      this.UserNameKey = 'userName';
    }
    getToken(): string {
      console.log("TOKENKEY",this.getCookie(this.TOKENKEY))
      return this.getCookie(this.TOKENKEY);
    }
    getCurrentUser(): any {
      let userName = this.getCookie(this.UserNameKey);
      let userId = this.getCookie(this.userIdKey);
      let token = this.getCookie(this.TOKENKEY);
  
      return {
        userName: userName,
        userId: userId,
        token: token,
      };
    }
    setCurrentUser(
      token: string,
      userName: string,
      userId: string,
    ): void {
      this.setCookie(this.TOKENKEY, token);
      this.setCookie(this.UserNameKey, userName);
      this.setCookie(this.userIdKey, userId);
    }
    saveToken(token: string) {
      this.setCookie(this.TOKENKEY, token);
    }
  
    isLogged(): boolean {
      let token = this.getCookie(this.TOKENKEY);
      if (token === '' || token === null) return false;
      else return true;
    }
    logout(): void {
      this.deleteCookie(this.TOKENKEY);
      this.deleteCookie(this.UserNameKey);
      this.deleteCookie(this.userIdKey);
    }
    private deleteCookie(key: any): void {
      document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    private setCookie(key: string, value: string): void {
      document.cookie = key + '=' + value + ';path=/';
    }
    private getCookie(cname: any): string {
      let name = cname + '=';
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
    
  // refreshToken() {
  //   let header: any;
  //   header = new HttpHeaders({ 'token': this.currentUserValue.tokenKey, 'refresh-token': this.currentUserValue.refreshToken });
  //   if (!this.currentUserValue.refreshToken) {
  //     this.logout();
  //   }
  //   let lastTime: number = localStorage.getItem('refresh_' + this.currentUserValue.UserId) ? Number(localStorage.getItem('refresh_' + this.currentUserValue.UserId)) : 0;
  //   if (lastTime == 0 || (new Date().getTime() - lastTime > 5 * 60 * 1000)) {
  //     this.http.post<any>(AppSettings.API_REFRESH_TOKEN_DEVICE, {}, { headers: header }).subscribe((res: any) => {
  //       if (res.error) {
  //         this.logout();
  //       } else {
  //         const data = res.data;
  //         if (data) {
  //           let old_currenUser = this.currentUserValue;
  //           const currentUser = {
  //             "tokenKey": data['token'],
  //             "tokenSso": old_currenUser['tokenSso'],
  //             "Role": old_currenUser['Role'],
  //             "UserId": old_currenUser['UserId'],
  //             "Partner": old_currenUser['Partner'],
  //             "refreshToken": data['refreshToken']
  //           };
  //           this.saveData(currentUser);
  //           let infor = localStorage.getItem('inforUser') ? JSON.parse(localStorage.getItem('inforUser')) : [];
  //           if (infor && Object.keys(infor).length) {
  //             infor = infor.filter((el: any) => el.userId && (el.userId !== data['UserId']));
  //           }
  //           infor.push({ userName: data['UserName'], userId: data['UserId'], tokenVTP: data['TokenKey'], tokenSSO: old_currenUser['tokenSso'] });
  //           localStorage.setItem('inforUser', JSON.stringify(infor));
  //           localStorage.setItem('refresh_' + this.currentUserValue.UserId, JSON.stringify(new Date().getTime()));
  //           window.location.reload();
  //         } else {
  //           this.logout()
  //         }
  //       }
  //     })
  //   } else {
  //     this.logout();
  //   }

  // }
  }
  