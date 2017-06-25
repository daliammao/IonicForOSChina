import {Component} from "@angular/core";
import {BlogItemBean} from "../../bean/blog_list.bean";
import {InfiniteScroll, NavController, Refresher} from "ionic-angular";
import {BlogService} from "../../service/blog.service";
import {BlogDetailPage} from "../blog-detail/blog-detail";

/**
 * Generated class for the BlogListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'blog-list',
  templateUrl: 'blog-list.html'
})
export class BlogListComponent {

  enableLoadMore: boolean = true;
  blogItems: BlogItemBean[];

  constructor(public navCtrl: NavController,
              public blogSer: BlogService) {
    this.doRefresh();
  }

  itemSelected(item: BlogItemBean): boolean {
    this.navCtrl.push(BlogDetailPage,{
      blogId:item.id
    });
    return false;
  }

  pageNum: number = 1;

  doRefresh(refresher?: Refresher): void {
    this.pageNum = 1;
    //获取列表数据
    this.blogSer.getBlogListData(this.pageNum, 10)
      .subscribe(data => {
          if (refresher) {
            refresher.complete();
          }

          this.setBlogItems(data.bloglist);
          this.enableLoadMore = data.bloglist.length >= 10;
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
    this.blogSer.getBlogListData(this.pageNum, 10)
      .subscribe(data => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }

          this.addBlogItems(data.bloglist);
          this.enableLoadMore = data.bloglist.length >= 10;
        },
        error => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          }
          console.error(error)
          this.enableLoadMore = false;
        });
  }

  setBlogItems(items: BlogItemBean[]): void {
    this.blogItems = items;
  }

  addBlogItems(items: BlogItemBean[]): void {
    if (this.blogItems && items) {
      this.blogItems = this.blogItems.concat(items);
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
