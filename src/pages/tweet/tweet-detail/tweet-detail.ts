import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {TweetService} from "../service/tweet.service";
import {TweetDetailBean} from "../bean/tweet_detail.bean";

/**
 * Generated class for the TweetDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-tweet-detail',
  templateUrl: 'tweet-detail.html',
})
export class TweetDetailPage {
  tweetDetail:TweetDetailBean

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public tweetSer: TweetService) {
    let tweetId: number = navParams.get('tweetId');
    this.tweetSer.getTweetDetailData(tweetId)
      .subscribe(data => {
        this.tweetDetail = data;
      })
  }
}
