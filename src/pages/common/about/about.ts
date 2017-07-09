import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {ThemeableBrowser, ThemeableBrowserOptions} from "@ionic-native/themeable-browser";

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private themeableBrowser: ThemeableBrowser) {
  }

  toGit(): boolean {
    const options: ThemeableBrowserOptions = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        showPageTitle: true
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        image: 'forward',
        imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        image: 'close',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          image: 'share',
          imagePressed: 'share_pressed',
          align: 'right',
          event: 'sharePressed'
        }
      ],
      menu: {
        image: 'menu',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
          {
            event: 'helloPressed',
            label: 'Hello World!'
          },
          {
            event: 'testPressed',
            label: 'Test!'
          }
        ]
      },
      backButtonCanClose: true
    };

    const browser = this.themeableBrowser.create('https://github.com/daliammao/IonicForOSChina', '_blank', options);
    return false;
  }

}
