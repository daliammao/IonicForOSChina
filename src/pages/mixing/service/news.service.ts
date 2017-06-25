/**
 * Created by hero on 2017/6/5.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {BaseHttpService} from "../../base/base.http.service";
import {NewsListBean} from "../bean/news_list.bean";
import {LoginService} from "../../account/service/login.service";
import {NewsDetailBean} from "../bean/news_detail.bean";

@Injectable()
export class NewsService extends BaseHttpService {
  constructor(private loginSer: LoginService,
              private http: Http) {
    super(http);
  }

  /**
   * 获取新闻列表
   * @param type
   * @param page
   * @param pageSize
   * @returns {Observable<R>}
   */
  public getNewsListData(catalog: number, page: number, pageSize: number): Observable<NewsListBean> {
    return this.getForHttp(this.HOST + '/action/openapi/news_list',
      {
        'access_token': this.loginSer.getAccessToken(),
        catalog,
        page,
        pageSize
      });
  }

  /**
   * 获取新闻详情
   * @param id
   * @returns {Observable<T>}
   */
  public getNewsDetailData(id:number):Observable<NewsDetailBean>{
    return this.getForHttp(this.HOST + '/action/openapi/news_detail',
      {
        'access_token': this.loginSer.getAccessToken(),
        id
      });
  }
}
