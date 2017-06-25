import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountHomePage } from './account-home';

@NgModule({
  declarations: [
    AccountHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountHomePage),
  ],
  exports: [
    AccountHomePage
  ]
})
export class AccountHomePageModule {}
