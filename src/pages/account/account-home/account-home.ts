import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {AccountDetailBean} from "../bean/account_detail.bean";
import {AccountService} from "../service/account.service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {SettingPage} from "../../common/setting/setting";

/**
 * Generated class for the AccountHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-home',
  templateUrl: 'account-home.html',
})
export class AccountHomePage {

  userInfo: AccountDetailBean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public barcodeScanner: BarcodeScanner,
              public accounrSer: AccountService) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.accounrSer.getAccountInfo()
      .subscribe(data => {
          this.userInfo = data;
        },
        err => {
          console.error(err);
        })
  }

  getGender(): string {
    if (this.userInfo && this.userInfo.gender == 2) {
      return 'female';
    } else {
      return 'male';
    }
  }

  goToSetting():boolean {
    this.navCtrl.push(SettingPage);
    return false;
  }

  getQrCode(): boolean {
    this.barcodeScanner.encode("TEXT_TYPE", `userID://${this.userInfo.uid}`)
      .then(
        result => {
          console.log(result)
        },
        error => {
          console.error(error);
        });
    return false;
  }
}
