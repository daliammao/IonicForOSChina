import {Component} from "@angular/core";
import {
  AlertController,
  InfiniteScroll,
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  Refresher
} from "ionic-angular";
import {ProjectItemBean, ProjectListBean} from "../../bean/project.bean";
import {ProjectService} from "../../service/project.service";
import {WebBrowserPage} from "../../../common/web-browser/web-browser";
import {ProjectFilterPage} from "../project-filter/project-filter";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-project-home',
  templateUrl: 'project-home.html',
})
export class ProjectHomePage {
  tag: number = -1;
  enableLoadMore: boolean = true;
  projectItems: ProjectItemBean[];

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              public projectSer: ProjectService) {
    this.doRefresh();
  }

  itemSelected(item: ProjectItemBean): boolean {
    this.navCtrl.push(WebBrowserPage, {
      'url': item.url,
      'title': item.name
    })
    return false;
  }

  pageNum: number = 1;

  doRefresh(refresher?: Refresher): void {
    this.pageNum = 1;
    //获取列表数据
    let request: Observable<ProjectListBean>;
    if (this.tag >= 0) {
      request = this.projectSer.getProjectListDataWithTag(this.tag, this.pageNum, 10);
    } else {
      request = this.projectSer.getProjectListData('recommend', this.pageNum, 10);
    }

    request.subscribe(data => {
        if (refresher) {
          refresher.complete();
        }

        this.setProjectItems(data.projectlist);
        this.enableLoadMore = data.projectlist.length >= 10;
      },
      error => {
        if (refresher) {
          refresher.complete();
        }
        this.enableLoadMore = false;
        console.error(error)
      });
  };

  doInfinite(infiniteScroll?: InfiniteScroll): void {
    this.pageNum++;
    //获取列表数据
    let request: Observable<ProjectListBean>;
    if (this.tag >= 0) {
      request = this.projectSer.getProjectListDataWithTag(this.tag, this.pageNum, 10);
    } else {
      request = this.projectSer.getProjectListData('recommend', this.pageNum, 10);
    }

    request.subscribe(data => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }

        this.addProjectItems(data.projectlist);
        this.enableLoadMore = data.projectlist.length >= 10;
      },
      error => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        this.enableLoadMore = false;
        console.error(error)
      });
  }

  setProjectItems(items: ProjectItemBean[]): void {
    this.projectItems = items;
  }

  addProjectItems(items: ProjectItemBean[]): void {
    if (this.projectItems && items) {
      this.projectItems = this.projectItems.concat(items);
    }
  }

  presentFilter(myEvent): void {
    let popover = this.popoverCtrl.create(ProjectFilterPage);
    popover.present({
      ev: myEvent
    });

    popover.onWillDismiss(data => {
      if (data) {
        this.presentSheets(data.tag);
      }
    })
  }

  presentSheets(tag: number): void {
    this.projectSer.getProjectCatalogListData(tag)
      .subscribe(
        data => {
          let alert = this.alertCtrl.create();
          alert.setTitle('选择分类');

          data.softwareTypes.forEach(data => {
            alert.addInput({
              type: 'radio',
              label: data.name,
              value: data.tag,
              checked: false
            });
          })

          alert.addButton('取消');
          alert.addButton({
            text: '确认',
            handler: data => {
              this.tag = data;
              this.doRefresh();
            }
          });
          alert.present();
        },
        error => {
          console.error(error)
        })
  }

  parseDateFromString(dateStr: string): number {
    if (dateStr) {
      return Date.parse(dateStr);
    } else {
      return 0;
    }
  }
}
