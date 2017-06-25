/**
 * Created by hero on 2017/6/4.
 */
import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs/Observable";
import {BaseHttpService} from "../../base/base.http.service";
import {Http} from "@angular/http";
import {TokenBean} from "../bean/token.bean";

import "rxjs/add/operator/zip";

@Injectable()
export class LoginService extends BaseHttpService {

  private accessToken: string;
  private refreshToken: string;

  constructor(public storage: Storage,
              public http: Http) {
    super(http);
  }

  init(): Observable<boolean> {
    let accessOb = Observable.create(observer => {
      this.storage.get('account.accessToken')
        .then((accessToken) => {
          this.accessToken = accessToken;
          observer.next(accessToken);
          observer.complete();
        });
    })

    let refreshOb = Observable.create(observer => {
      this.storage.get('account.refreshToken')
        .then((refreshToken) => {
          this.refreshToken = refreshToken;
          observer.next(refreshToken);
          observer.complete();
        });
    })

    return accessOb.zip(refreshOb, (access, refresh) => {
      return true
    });
  }

  isLogin(): boolean {
    return this.accessToken != undefined;
  }

  getAccessToken(): string {
    return this.accessToken
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  loginWithCode(code: string): Observable<boolean> {
    return this.getForHttp<TokenBean>(
      this.HOST + '/action/openapi/token',
      {
        'client_id': this.CLIENT_ID,
        'client_secret': this.CLIENT_SECRET,
        'grant_type': "authorization_code",
        'code': code,
        'dataType': 'json',
        'redirect_uri': BaseHttpService.CALL_HOST,
      }
    )
      .map(data => {
        this.storage.set("account.accessToken", data.access_token);
        this.storage.set("account.refreshToken", data.refresh_token);
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        return true;
      });
  }

  logout() {
    this.storage.remove('account.accessToken');
    this.storage.remove('account.refreshToken');
  }
}
