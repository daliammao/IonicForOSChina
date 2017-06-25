import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebBrowserPage } from './web-browser';

@NgModule({
  declarations: [
    WebBrowserPage,
  ],
  imports: [
    IonicPageModule.forChild(WebBrowserPage),
  ],
  exports: [
    WebBrowserPage
  ]
})
export class WebBrowserPageModule {}
