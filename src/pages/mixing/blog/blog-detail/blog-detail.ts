import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BlogService} from "../../service/blog.service";
import {BlogDetailBean} from "../../bean/blog_detial.bean";

/**
 * Generated class for the BlogDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-blog-detail',
  templateUrl: 'blog-detail.html',
})
export class BlogDetailPage {
  blogDetail: BlogDetailBean;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public blogSer: BlogService) {
    let blogId: number = navParams.get('blogId');
    this.blogSer.getBlogDetailData(blogId)
      .subscribe(data => {
        this.blogDetail = data;
      })
  }
}
