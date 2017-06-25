import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the MixingHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mixing-home',
  templateUrl: 'mixing-home.html',
})
export class MixingHomePage {
  segmentIndex: string = 'news';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService) {
  }

  ionViewDidLoad() {
  }

}
