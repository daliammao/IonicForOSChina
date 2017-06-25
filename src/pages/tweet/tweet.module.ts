/**
 * Created by hero on 2017/6/3.
 */
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {TweetHomePage} from "./tweet-home/tweet-home";
import {TweetListComponent} from "./tweet-list/tweet-list";
import {TweetService} from "./service/tweet.service";
import {TweetPubComponent} from "./tweet-pub/tweet-pub";
import {NativeImageService} from "../common/service/native-image.service";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {TweetDetailPage} from "./tweet-detail/tweet-detail";

@NgModule({
  imports: [IonicModule, TranslateModule],
  exports: [TweetHomePage, TweetPubComponent],
  declarations: [TweetHomePage, TweetListComponent, TweetPubComponent, TweetDetailPage],
  entryComponents: [TweetHomePage, TweetListComponent, TweetDetailPage],
  providers: [TweetService, Camera, NativeImageService, File],
})
export class TweetModule {
  constructor(@Optional() @SkipSelf() parentModule: TweetModule) {
    if (parentModule) {
      throw new Error(
        'TweetModule is already loaded. Import it in the AppModule only');
    }
  }
}
