/**
 * Created by hero on 2017/6/5.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";
import {BaseHttpService} from "../../base/base.http.service";
import {LoginService} from "../../account/service/login.service";
import {TweetListBean} from "../bean/tweet_list.bean";
import {File} from "@ionic-native/file";
import {ErrorBean} from "../bean/error.bean";
import {TweetDetailBean} from "../bean/tweet_detail.bean";

@Injectable()
export class TweetService extends BaseHttpService {
  constructor(private loginSer: LoginService,
              private http: Http,
              private file: File) {
    super(http);
  }

  /**
   * 获取动弹列表
   * @param type
   * @param page
   * @param pageSize
   * @returns {Observable<R>}
   */
  public getTweetListData(user: number, page: number, pageSize: number): Observable<TweetListBean> {
    return this.getForHttp(this.HOST + '/action/openapi/tweet_list',
      {
        'access_token': this.loginSer.getAccessToken(),
        user,
        page,
        pageSize
      });
  }

  /**
   * 获取动弹详情
   * @param tweetId
   * @returns {Observable<T>}
   */
  public getTweetDetailData(tweetId: number): Observable<TweetDetailBean> {
    return this.getForHttp(this.HOST + '/action/openapi/tweet_detail',
      {
        access_token: this.loginSer.getAccessToken(),
        id: tweetId,
      });
  }

  public pubTweet(msg: string, imgPath: string): Observable<ErrorBean> {

    return Observable.create(observer => {
      this.readAsBinary(imgPath)
        .then(img => {
            observer.next(img)
          },
          err => {
            observer.error(err);
          });
    })
      .flatMap(img => {
        return this.getForHttp(this.HOST + '/action/openapi/tweet_pub',
          {
            'access_token': this.loginSer.getAccessToken(),
            msg,
            // img,
          }
        )
      });
  }

  readAsBinary(path: string): Promise<string> {
    if (path) {

      let slashIndex: number = path.lastIndexOf('/');
      let queIndex: number = path.lastIndexOf('?');
      let dire = "";
      let file = "";
      if (slashIndex) {
        dire = path.slice(0, slashIndex + 1)
        if (queIndex) {
          file = path.slice(slashIndex + 1, queIndex);
        } else {
          file = path.slice(slashIndex);
        }
      }

      return this.file.readAsBinaryString(dire, file);
    } else {
      return new Promise((resolve, reject) => {
        resolve("");
      })
    }
  }
}
