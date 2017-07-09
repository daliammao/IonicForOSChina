/**
 * Created by hero on 2017/5/30.
 */
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

export class BaseHttpService {
  static CALL_HOST: string = 'https://my.oschina.net/u/1273211';

  HOST: string = 'http://www.oschina.net';
  CLIENT_ID: string = 'BxhBNM1hwZx6eK9ranNM';
  CLIENT_SECRET: string = 'myMpqgZDbhfsNWsujlPeWpa7u5pzf8qh';

  constructor(private baseHttp: Http) {
  }

  public getForHttp<T>(api: string, body?: any, options?: RequestOptionsArgs): Observable<T> {
    let myApi = api;

    if (body) {
      let param: string = "?";
      for (var i in body) {
        param += `${i}=${body[i]}&`
      }
      if(param.endsWith('&')){
        param = param.slice(0,param.length-1);
      }
      myApi += param;
    }

    return this.baseHttp.get(myApi, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postForHttp<T>(api: string, body: any, options?: RequestOptionsArgs): Observable<T> {
    return this.baseHttp.post(api, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();

    console.error(errMsg);
    return Observable.throw<string>(errMsg);
  }
}
