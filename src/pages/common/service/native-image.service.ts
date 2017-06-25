/**
 * Created by hero on 2017/6/9.
 */
import {Injectable} from "@angular/core";
import {LoadingController, ToastController} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NativeImageService {

  private loading;

  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private camera: Camera) {
  }

  /**
   * 统一调用此方法显示提示信息
   * @param message 信息内容
   * @param duration 显示时长
   */
  showToast = (message: string = '操作完成', duration: number = 2500) => {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: '关闭'
    });
    toast.present();
  };

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  showLoading = (content: string = '') => {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  };

  /**
   * 关闭loading
   */
  hideLoading = () => {
    this.loading.dismissAll()
  };

  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture(options): Observable<string> {
    return Observable.create((obsever) => {
      this.camera.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
        destinationType: this.camera.DestinationType.FILE_URI,//返回值格式,DATA_URL:base64,FILE_URI:图片路径
        quality: 90,//保存的图像质量，范围为0 - 100
        allowEdit: false,//选择图片前是否允许编辑
        encodingType: this.camera.EncodingType.JPEG,
        // targetWidth: 800,//缩放图像的宽度（像素）
        // targetHeight: 800,//缩放图像的高度（像素）
        saveToPhotoAlbum: false,//是否保存到相册
        correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
      }, options))
        .then(
          (imageData) => {
            obsever.next(imageData);
            obsever.complete()
          },
          (err) => {
            obsever.error(err.toString());
          })
    });
  };

  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary(options = {}): Observable<string> {
    return this.getPicture(Object.assign({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }, options));
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera(options = {}): Observable<string> {
    return this.getPicture(Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA
    }, options));
  };
}
