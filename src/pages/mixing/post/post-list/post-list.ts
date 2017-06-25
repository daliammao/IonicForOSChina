import {Component} from "@angular/core";
import {PostItemBean} from "../../bean/post_list.bean";
import {PostService} from "../../service/post.service";
import {InfiniteScroll, NavController, Refresher} from "ionic-angular";
import {PostDetailPage} from "../post-detail/post-detail";

/**
 * Generated class for the PostListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'post-list',
  templateUrl: 'post-list.html'
})
export class PostListComponent {

  enableLoadMore: boolean = true;
  postItems: PostItemBean[];

  constructor(public navCtrl: NavController,
              public postSer: PostService) {
    this.doRefresh();
  }

  itemSelected(item: PostItemBean): boolean {
    this.navCtrl.push(PostDetailPage,{
      postId:item.id
    });
    return false;
  }

  pageNum: number = 1;

  doRefresh(refresher?: Refresher): void {
    this.pageNum = 1;
    //获取列表数据
    this.postSer.getPostListData(this.pageNum, 10)
      .subscribe(data => {
          if (refresher) {
            refresher.complete();
          }

          this.setPostItems(data.post_list);
          this.enableLoadMore = data.post_list.length >= 10;
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
    this.postSer.getPostListData(this.pageNum, 10)
      .subscribe(data => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }

          this.addPostItems(data.post_list);
          this.enableLoadMore = data.post_list.length >= 10;
        },
        error => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
          this.enableLoadMore = false;
          console.error(error)
        });
  }

  setPostItems(items: PostItemBean[]): void {
    this.postItems = items;
  }

  addPostItems(items: PostItemBean[]): void {
    if (this.postItems && items) {
      this.postItems = this.postItems.concat(items);
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
