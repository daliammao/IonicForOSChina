import {Component, ViewChild} from "@angular/core";
import {FabContainer, IonicPage, NavController, NavParams} from "ionic-angular";
import {TweetPubComponent} from "../../tweet/tweet-pub/tweet-pub";

/**
 * Generated class for the PublishHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-publish-home',
  templateUrl: 'publish-home.html',
})
export class PublishHomePage {
  @ViewChild('tweet') tweet: TweetPubComponent;

  publishTitle: string;
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.changeType('tweet');
  }

  changeType(type: string, fab?: FabContainer): boolean {
    this.type = type;
    switch (type) {
      case 'tweet':
        this.publishTitle = '弹一弹';
        break;
      case 'blog':
        this.publishTitle = '发博客';
        break;
      case 'post':
        this.publishTitle = '上贴子';
        break;
    }
    if (fab) {
      fab.close();
    }
    return false;
  }

  submit(): boolean {
    switch (this.type) {
      case 'tweet':
        this.tweet.submit();
        break;
    }
    return false;
  }

}
