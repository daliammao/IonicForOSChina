import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExplortHomePage } from './explort-home';

@NgModule({
  declarations: [
    ExplortHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ExplortHomePage),
  ],
  exports: [
    ExplortHomePage
  ]
})
export class ExplortHomePageModule {}
