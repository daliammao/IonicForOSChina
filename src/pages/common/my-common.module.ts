import {NgModule, Optional, SkipSelf} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {WebBrowserPage} from "./web-browser/web-browser";
import {HomePage} from "./home/home";
import {SettingPage} from "./setting/setting";
import {AboutPage} from "./about/about";
import {PublishHomePage} from "./publish-home/publish-home";
import {TweetModule} from "../tweet/tweet.module";
/**
 * Created by hero on 2017/6/8.
 */
@NgModule({
  imports: [IonicModule, TranslateModule,TweetModule],
  exports: [WebBrowserPage, HomePage, PublishHomePage],
  declarations: [WebBrowserPage, HomePage, PublishHomePage, SettingPage, AboutPage],
  entryComponents: [WebBrowserPage, HomePage, PublishHomePage, SettingPage, AboutPage],
  providers: [],
})
export class MyCommonModule {
  constructor(@Optional() @SkipSelf() parentModule: MyCommonModule) {
    if (parentModule) {
      throw new Error(
        'MyCommonModule is already loaded. Import it in the AppModule only');
    }
  }
}
