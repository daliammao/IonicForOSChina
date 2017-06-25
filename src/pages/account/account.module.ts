/**
 * Created by hero on 2017/6/4.
 */
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {AccountHomePage} from "./account-home/account-home";
import {LoginPage} from "./login/login";
import {AccountService} from "./service/account.service";

@NgModule({
  imports: [IonicModule, TranslateModule],
  exports: [AccountHomePage, LoginPage],
  declarations: [AccountHomePage, LoginPage],
  entryComponents: [AccountHomePage, LoginPage],
  providers: [AccountService],
})
export class AccountModule {
  constructor(@Optional() @SkipSelf() parentModule: AccountModule) {
    if (parentModule) {
      throw new Error(
        'AccountModule is already loaded. Import it in the AppModule only');
    }
  }
}
