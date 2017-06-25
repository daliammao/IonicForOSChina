import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TweetDetailPage } from './tweet-detail';

@NgModule({
  declarations: [
    TweetDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TweetDetailPage),
  ],
  exports: [
    TweetDetailPage
  ]
})
export class TweetDetailPageModule {}
