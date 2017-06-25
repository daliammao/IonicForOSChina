/**
 * Created by hero on 2017/6/5.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {BaseHttpService} from "../../base/base.http.service";
import {Observable} from "rxjs/Observable";
import {LoginService} from "../../account/service/login.service";
import {PostListBean} from "../bean/post_list.bean";
import {PostDetailBean} from "../bean/post_detail.bean";

@Injectable()
export class PostService extends BaseHttpService {
  constructor(private loginSer: LoginService,
              private http: Http) {
    super(http);
  }

  /**
   * 获取帖子列表
   * @param type
   * @param page
   * @param pageSize
   * @returns {Observable<R>}
   */
  public getPostListData(page: number, pageSize: number): Observable<PostListBean> {
    return this.getForHttp(this.HOST + '/action/openapi/post_list',
      {
        'access_token': this.loginSer.getAccessToken(),
        page,
        pageSize
      });
  }

  /**
   * 获取帖子详情
   * @param id
   * @returns {Observable<T>}
   */
  public getPostDetailData(id:number):Observable<PostDetailBean>{
    return this.getForHttp(this.HOST + '/action/openapi/post_detail',
      {
        'access_token': this.loginSer.getAccessToken(),
        id
      });
  }
}
