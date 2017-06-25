import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private iab: InAppBrowser) {
  }

  toGit(): boolean {
    const browser = this.iab.create('https://github.com/daliammao/IonicTest');
    browser.show();
    return false;
  }

}
