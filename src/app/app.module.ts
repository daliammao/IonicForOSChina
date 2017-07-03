import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MyApp} from "./app.component";

import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {MixingModule} from "../pages/mixing/mixing.module";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";
import {TweetModule} from "../pages/tweet/tweet.module";
import {ExplortModule} from "../pages/explort/explort.module";
import {AccountModule} from "../pages/account/account.module";
import {LoginService} from "../pages/account/service/login.service";
import {IonicStorageModule} from "@ionic/storage";
import {MyCommonModule} from "../pages/common/my-common.module";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {NativeImageService} from "../pages/common/service/native-image.service";

export function HttpLoaderFactory(http:Http){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    MyCommonModule,
    MixingModule,
    TweetModule,
    ExplortModule,
    AccountModule,

    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true'
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  declarations: [
    MyApp
  ],
  entryComponents: [
    MyApp,
  ],
  providers: [
    LoginService,
    NativeImageService,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
