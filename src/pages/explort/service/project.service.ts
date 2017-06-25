/**
 * Created by hero on 2017/6/6.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {BaseHttpService} from "../../base/base.http.service";
import {ProjectListBean} from "../bean/project.bean";
import {LoginService} from "../../account/service/login.service";
import {ProjectTypeListBean} from "../bean/project-catalog.bean";

@Injectable()
export class ProjectService extends BaseHttpService {
  constructor(private loginSer: LoginService,
              private http: Http) {
    super(http);
  }

  /**
   * 获取软件列表
   * @param type
   * @param page
   * @param pageSize
   * @returns {Observable<T>}
   */
  getProjectListData(type: string, page: number, pageSize: number): Observable<ProjectListBean> {
    return this.getForHttp(
      this.HOST + "/action/openapi/project_list",
      {
        'access_token': this.loginSer.getAccessToken(),
        type,
        page,
        pageSize
      }
    )
  }

  /**
   * 通过tag获取软件列表
   * @param type
   * @param page
   * @param pageSize
   * @returns {Observable<T>}
   */
  getProjectListDataWithTag(tag: number, page: number, pageSize: number): Observable<ProjectListBean> {
    return this.getForHttp(
      this.HOST + "/action/openapi/project_tag_list",
      {
        'access_token': this.loginSer.getAccessToken(),
        tag,
        page,
        pageSize
      }
    )
  }

  /**
   * 获取软件类别
   * @param tag
   * @returns {Observable<T>}
   */
  getProjectCatalogListData(tag: number): Observable<ProjectTypeListBean> {
    return this.getForHttp(
      this.HOST + "/action/openapi/project_catalog_list",
      {
        'access_token': this.loginSer.getAccessToken(),
        tag
      }
    )
  }
}
