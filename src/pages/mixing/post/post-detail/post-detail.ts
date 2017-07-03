import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PostService} from "../../service/post.service";
import {PostDetailBean} from "../../bean/post_detail.bean";

/**
 * Generated class for the PostDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
  postDetail: PostDetailBean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public postSer: PostService) {
    let postId: number = navParams.get('postId');
    this.postSer.getPostDetailData(postId)
      .subscribe(data => {
        this.postDetail = data;
      })
  }
}
