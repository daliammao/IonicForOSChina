import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectHomePage } from './project-home';

@NgModule({
  declarations: [
    ProjectHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectHomePage),
  ],
  exports: [
    ProjectHomePage
  ]
})
export class ProjectHomePageModule {}
