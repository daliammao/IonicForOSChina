import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the WebBrowserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-web-browser',
  templateUrl: 'web-browser.html',
})
export class WebBrowserPage {

  url: string;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.url = this.navParams.get('url');
    this.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    this.load();
  }

  load(): void {
    let iframe: any = document.getElementById("iframe");
    iframe.src = this.url;
  }
}
