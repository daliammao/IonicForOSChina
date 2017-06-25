import {Component, Input} from "@angular/core";
import {TweetItemBean} from "../bean/tweet_list.bean";
import {Observable} from "rxjs/Observable";
import {TweetService} from "../service/tweet.service";
import {InfiniteScroll, NavController, Refresher} from "ionic-angular";
import {TweetDetailPage} from "../tweet-detail/tweet-detail";

/**
 * Generated class for the TweetListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tweet-list',
  templateUrl: 'tweet-list.html'
})
export class TweetListComponent {
  @Input() user: number;

  enableLoadMore: boolean = true;
  tweetItems: TweetItemBean[];

  constructor(public navCtrl: NavController,
              public tweetSer: TweetService) {
    Observable
      .timer(1000)
      .subscribe(() => {
        this.doRefresh();
      });
  }

  itemSelected(item: TweetItemBean): boolean {
    this.navCtrl.push(TweetDetailPage, {
      tweetId: item.id
    });
    return false;
  }

  pageNum: number = 1;

  doRefresh(refresher?: Refresher): void {
    this.pageNum = 1;
    //获取列表数据
    this.tweetSer.getTweetListData(this.user, this.pageNum, 10)
      .subscribe(data => {
          if (refresher) {
            refresher.complete();
          }

          this.setTweetItems(data.tweetlist);
          this.enableLoadMore = data.tweetlist.length >= 10;
        },
        error => {
          if (refresher) {
            refresher.complete();
          }
          this.enableLoadMore = false;
          console.error(error)
        });
  };

  doInfinite(infiniteScroll?: InfiniteScroll): void {
    this.pageNum++;
    //获取列表数据
    this.tweetSer.getTweetListData(this.user, this.pageNum, 10)
      .subscribe(data => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }

          this.addTweetItems(data.tweetlist);
          this.enableLoadMore = data.tweetlist.length >= 10;
        },
        error => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
          console.error(error)
          this.enableLoadMore = false;
        });
  }

  setTweetItems(items: TweetItemBean[]): void {
    this.tweetItems = items;
  }

  addTweetItems(items: TweetItemBean[]): void {
    if (this.tweetItems && items) {
      this.tweetItems = this.tweetItems.concat(items);
    }
  }

  parseDateFromString(dateStr: string): number {
    if (dateStr) {
      return Date.parse(dateStr);
    } else {
      return 0;
    }
  }
}
