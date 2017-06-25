import {Component} from "@angular/core";
import {NativeImageService} from "../../common/service/native-image.service";
import {ActionSheetController, ToastController} from "ionic-angular";
import {TweetService} from "../service/tweet.service";

/**
 * Generated class for the TweetPubComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tweet-pub',
  templateUrl: 'tweet-pub.html'
})
export class TweetPubComponent {
  isChange: boolean = false;//图片是否改变标识
  imagePath: string = './assets/drawable/add_img.png';//用户默认头像

  tweetText: string;

  constructor(public nativeService: NativeImageService,
              public actionSheetCtrl: ActionSheetController,
              public tweetSer: TweetService,
              public toastCtrl: ToastController) {

  }

  getPicture(type) {//1拍照,0从图库选择
    let options = {
      quality: 50
      // targetWidth: 400,
      // targetHeight: 400
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(path => {
          this.getPictureSuccess(path);
        },
        err => {
          console.error(err);
        });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(path => {
          this.getPictureSuccess(path);
        },
        err => {
          console.error(err);
        });
    }
  }

  getPictureSuccess(path: string) {
    this.isChange = true;
    this.imagePath = path;
  }

  submit() {
    if (!this.tweetText) {
      this.toastCtrl.create({
        message: "请输入动弹内容",
        duration: 3000
      }).present();
      return;
    }
    this.tweetSer.pubTweet(this.tweetText, this.imagePath)
      .subscribe(result => {
        this.toastCtrl.create({
          message: '发布成功',
          duration: 3000
        }).present();

        this.imagePath = './assets/drawable/add_img.png';
        this.tweetText = "";
      }, err => {
      });
  }

  presentImageAction() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择方式',
      buttons: [
        {
          text: '从相册选取',
          role: 'destructive',
          handler: () => {
            this.getPicture(0);
          }
        }, {
          text: '照相',
          handler: () => {
            this.getPicture(1);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
