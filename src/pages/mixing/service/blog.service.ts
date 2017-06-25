/**
 * Created by hero on 2017/6/5.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BaseHttpService} from "../../base/base.http.service";
import {BlogListBean} from "../bean/blog_list.bean";
import {LoginService} from "../../account/service/login.service";
import {BlogDetailBean} from "../bean/blog_detial.bean";

@Injectable()
export class BlogService extends BaseHttpService {
  constructor(private loginSer: LoginService,
              private http: Http) {
    super(http);
  }

  /**
   * 获取博客列表
   * @param type
   * @param page
   * @param pageSize
   * @returns {Observable<R>}
   */
  public getBlogListData(page: number, pageSize: number): Observable<BlogListBean> {
    return this.getForHttp(this.HOST + '/action/openapi/blog_list',
      {
        'access_token': this.loginSer.getAccessToken(),
        page,
        pageSize
      });
  }

  /**
   * 获取博客详情
   * @param id
   * @returns {Observable<T>}
   */
  public getBlogDetailData(id:number):Observable<BlogDetailBean>{
    return this.getForHttp(this.HOST + '/action/openapi/blog_detail',
      {
        'access_token': this.loginSer.getAccessToken(),
        id
      });
  }
}
