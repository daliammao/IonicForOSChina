import {Component} from "@angular/core";
import {NewsService} from "../../service/news.service";
import {InfiniteScroll, NavController, Refresher} from "ionic-angular";
import {NewsItemBean} from "../../bean/news_list.bean";

import "rxjs/add/observable/timer";
import {NewsDetailPage} from "../news-detail/news-detail";

/**
 * Generated class for the NewsListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'news-list',
  templateUrl: 'news-list.html'
})
export class NewsListComponent {

  enableLoadMore: boolean = true;
  newsItems: NewsItemBean[];

  constructor(public navCtrl: NavController,
              public newsSer: NewsService) {
    this.doRefresh();
  }

  itemSelected(item: NewsItemBean): boolean {
    this.navCtrl.push(NewsDetailPage,{
      newsId:item.id
    });
    return false;
  }

  pageNum: number = 1;
  catalog: number = 1;//所有类型

  doRefresh(refresher?: Refresher): void {
    this.pageNum = 1;
    //获取列表数据
    this.newsSer.getNewsListData(this.catalog, this.pageNum, 10)
      .subscribe(data => {
          if (refresher) {
            refresher.complete();
          }

          this.setNewsItems(data.newslist);
          this.enableLoadMore = data.newslist.length >= 10;
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
    this.newsSer.getNewsListData(this.catalog, this.pageNum, 10)
      .subscribe(data => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }

          this.addNewsItems(data.newslist);
          this.enableLoadMore = data.newslist.length >= 10;
        },
        error => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
          this.enableLoadMore = false;
          console.error(error)
        });
  }

  setNewsItems(items: NewsItemBean[]): void {
    this.newsItems = items;
  }

  addNewsItems(items: NewsItemBean[]): void {
    if (this.newsItems && items) {
      this.newsItems = this.newsItems.concat(items);
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
