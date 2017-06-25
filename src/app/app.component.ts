import {Component, ViewChild} from "@angular/core";
import {Nav, Platform, ToastController} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {TranslateService} from "@ngx-translate/core";
import {LoginService} from "../pages/account/service/login.service";
import {HomePage} from "../pages/common/home/home";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../pages/account/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  backButtonPressedOnceToExit: boolean = false;  //用于判断返回键是否触发

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public translate: TranslateService,
              public toastCtrl: ToastController,
              public storage: Storage,
              public loginSer: LoginService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //初始化，在这实例化后 其他page才可以即使拿到token
      this.translate.setDefaultLang('zh');

      this.loginSer.init()
        .subscribe(finish => {
          if (this.loginSer.isLogin()) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        });
      this.platform.registerBackButtonAction(e => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        console.error(page);
        //当前页面非tab栏
        if (!(page instanceof HomePage)) {
          if (!this.nav.canGoBack()) {
            return this.exit();
          }
          return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        if (!activeNav.canGoBack()) {
          //当前页面为tab栏，退出APP
          return this.exit();
        }
        //当前页面为tab栏的子页面，正常返回
        return activeNav.pop();
      }, 0);
    });
  }

  exit(){
    this.storage.get("setting.twice_out").then(type => {
      if (type) {
        this.twiceToExit();
      } else {
        this.onceToExit();
      }
    })
  }

  onceToExit() {
    this.platform.exitApp();
  }

  twiceToExit() {
    if (this.backButtonPressedOnceToExit) {
      this.platform.exitApp();
    } else {
      this.backButtonPressedOnceToExit = true;

      let toast = this.toastCtrl.create({
        message: '再按一次退出',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

      Observable.timer(2000)
        .subscribe(data => {
          this.backButtonPressedOnceToExit = false;
        });
    }
  }
}
