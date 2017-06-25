import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogDetailPage } from './blog-detail';

@NgModule({
  declarations: [
    BlogDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogDetailPage),
  ],
  exports: [
    BlogDetailPage
  ]
})
export class BlogDetailPageModule {}
