import {Component} from "@angular/core";
import {NavController, NavParams, ToastController} from "ionic-angular";
import {ProjectHomePage} from "../project/project-home/project-home";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

/**
 * Generated class for the ExplortHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-explort-home',
  templateUrl: 'explort-home.html',
})
export class ExplortHomePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public barcodeScanner: BarcodeScanner,
              public toasrCtrl: ToastController) {
  }

  goToProject(): boolean {
    this.navCtrl.push(ProjectHomePage);
    return false;
  }

  scanCode(): boolean {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here

      this.toasrCtrl.create({
        message: JSON.stringify(barcodeData.text),
        duration: 3000
      }).present();
    }, (err) => {
      // An error occurred
      console.error(err)
    });
    return false;
  }
}
