import {Component} from "@angular/core";
import {AlertController, App, NavController, NavParams, ToastController, Toggle} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {LoginService} from "../../account/service/login.service";
import {LoginPage} from "../../account/login/login";
import {AboutPage} from "../about/about";

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  outType: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loginSer: LoginService,
              public storage: Storage) {
    storage.get("setting.twice_out").then(type => {
      this.outType = type;
    })
  }

  changeOutType(toggle: Toggle): boolean {
    this.storage.set("setting.twice_out", this.outType);
    return false;
  }

  goToAbout():boolean{
    this.navCtrl.push(AboutPage);
    return false;
  }

  logout(): boolean {
    this.alertCtrl.create({
      title: "注销",
      message: "确定注销当前账号",
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确认',
          handler: () => {
            this.loginSer.logout();
            this.navCtrl.push(LoginPage);
            this.toastCtrl.create({
              message: "注销成功",
              duration: 3000
            }).present();
          }
        }
      ]
    })
      .present()
    return false;
  }
}
