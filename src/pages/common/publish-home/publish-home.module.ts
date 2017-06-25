import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishHomePage } from './publish-home';

@NgModule({
  declarations: [
    PublishHomePage,
  ],
  imports: [
    IonicPageModule.forChild(PublishHomePage),
  ],
  exports: [
    PublishHomePage
  ]
})
export class PublishHomePageModule {}
