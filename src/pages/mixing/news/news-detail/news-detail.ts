import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {NewsService} from "../../service/news.service";
import {NewsDetailBean} from "../../bean/news_detail.bean";

/**
 * Generated class for the NewsDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
  newsDetail: NewsDetailBean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsSer: NewsService) {

    let newsId: number = navParams.get('newsId');
    this.newsSer.getNewsDetailData(newsId)
      .subscribe(data => {
        this.newsDetail = data;
      })
  }

}
