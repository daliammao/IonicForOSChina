import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams, ToastController} from "ionic-angular";
import {LoginService} from "../service/login.service";
import {BaseHttpService} from "../../base/base.http.service";
import {HomePage} from "../../common/home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  static RESPONSE_TYPE: string = 'code';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public accountSer: LoginService) {

  }

  ionViewDidLoad() {
    this.load();
  }

  load(): void {
    let iframe: any = document.getElementById("iframe");
    iframe.src = `http://www.oschina.net/action/oauth2/authorize?response_type=${LoginPage.RESPONSE_TYPE}&client_id=BxhBNM1hwZx6eK9ranNM&redirect_uri=${BaseHttpService.CALL_HOST}`;
    iframe.onload = iframe.onreadystatechange = () => {
      if (!iframe.readyState || iframe.readyState == "complete") {
        try {
          let uri = iframe.contentWindow.location.href;
          if (uri.startsWith(BaseHttpService.CALL_HOST)) {
            //该url是回调url
            let typeIndex: number = uri.lastIndexOf(LoginPage.RESPONSE_TYPE);
            let paramStr: string = uri.slice(typeIndex);
            let params: string[] = paramStr.split('&', 1);
            let code: string = params[0].split('=')[1];
            this.login(code);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
  }

  login(code: string) {
    this.accountSer.loginWithCode(code)
      .subscribe(data => {
          if (data) {
            let toast = this.toastCtrl.create({
              message: '登录成功',
              duration: 3000
            });
            toast.present();
          }
          if(this.navCtrl.canGoBack()){
            this.navCtrl.popTo(HomePage);
          }else{
            this.navCtrl.setRoot(HomePage);
          }
        },
        error => {
          let toast = this.toastCtrl.create({
            message: '登录失败',
            duration: 3000
          });
          toast.present();
        }
      )
  }

}
