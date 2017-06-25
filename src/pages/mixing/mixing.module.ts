/**
 * Created by hero on 2017/6/3.
 */
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {MixingHomePage} from "./mixing-home/mixing-home";
import {IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {NewsListComponent} from "./news/news-list/news-list";
import {BlogListComponent} from "./blog/blog-list/blog-list";
import {PostListComponent} from "./post/post-list/post-list";
import {NewsService} from "./service/news.service";
import {BlogService} from "./service/blog.service";
import {PostService} from "./service/post.service";
import {NewsDetailPage} from "./news/news-detail/news-detail";
import {BlogDetailPage} from "./blog/blog-detail/blog-detail";
import {PostDetailPage} from "./post/post-detail/post-detail";

@NgModule({
  imports: [IonicModule, TranslateModule],
  exports: [MixingHomePage],
  declarations: [
    MixingHomePage,
    NewsDetailPage,
    NewsListComponent,
    BlogListComponent,
    BlogDetailPage,
    PostListComponent,
    PostDetailPage
  ],
  entryComponents: [MixingHomePage, NewsDetailPage, BlogDetailPage,PostDetailPage],
  providers: [NewsService, BlogService, PostService],
})
export class MixingModule {
  constructor(@Optional() @SkipSelf() parentModule: MixingModule) {
    if (parentModule) {
      throw new Error(
        'MixingModule is already loaded. Import it in the AppModule only');
    }
  }
}
