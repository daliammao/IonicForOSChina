import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Tabs} from 'ionic-angular';
import {MixingHomePage} from "../../mixing/mixing-home/mixing-home";
import {TweetHomePage} from "../../tweet/tweet-home/tweet-home";
import {ExplortHomePage} from "../../explort/explort-home/explort-home";
import {AccountHomePage} from "../../account/account-home/account-home";
import {PublishHomePage} from "../publish-home/publish-home";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('mainTabs') tabs:Tabs;

  mixingRoot = MixingHomePage;
  tweetRoot = TweetHomePage;
  publishRoot= PublishHomePage;
  exploreRoot = ExplortHomePage;
  accountRoot = AccountHomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
