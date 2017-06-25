/**
 * Created by hero on 2017/6/5.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {BaseHttpService} from "../../base/base.http.service";
import {Observable} from "rxjs/Observable";
import {AccountDetailBean} from "../bean/account_detail.bean";
import {LoginService} from "./login.service";

@Injectable()
export class AccountService extends BaseHttpService {
  constructor(private loginSer: LoginService,
              private http: Http) {
    super(http)
  }

  /**
   * 获取个人主页详情
   * @returns {Observable<T>}
   */
  getAccountInfo(): Observable<AccountDetailBean> {
    return this.getForHttp(
      this.HOST + "/action/openapi/my_information",
      {
        'access_token': this.loginSer.getAccessToken()
      }
    )
  }
}
