import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MixingHomePage } from './mixing-home';

@NgModule({
  declarations: [
    MixingHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MixingHomePage),
  ],
  exports: [
    MixingHomePage
  ]
})
export class MixingHomePageModule {}
