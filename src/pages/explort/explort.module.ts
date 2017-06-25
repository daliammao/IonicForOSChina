/**
 * Created by hero on 2017/6/3.
 */
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {ExplortHomePage} from "./explort-home/explort-home";
import {ProjectHomePage} from "./project/project-home/project-home";
import {ProjectService} from "./service/project.service";
import {ProjectFilterPage} from "./project/project-filter/project-filter";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@NgModule({
  imports: [IonicModule, TranslateModule],
  exports: [ExplortHomePage],
  declarations: [ExplortHomePage, ProjectHomePage, ProjectFilterPage],
  entryComponents: [ExplortHomePage, ProjectHomePage, ProjectFilterPage],
  providers: [ProjectService, BarcodeScanner],
})
export class ExplortModule {
  constructor(@Optional() @SkipSelf() parentModule: ExplortModule) {
    if (parentModule) {
      throw new Error(
        'ExplortModule is already loaded. Import it in the AppModule only');
    }
  }
}
