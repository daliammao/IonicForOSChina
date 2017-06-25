import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TweetHomePage } from './tweet-home';

@NgModule({
  declarations: [
    TweetHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TweetHomePage),
  ],
  exports: [
    TweetHomePage
  ]
})
export class TweetHomePageModule {}
