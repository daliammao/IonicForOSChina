import {Component} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {ProjectTypeItemBean} from "../../bean/project-catalog.bean";
import {ProjectService} from "../../service/project.service";

/**
 * Generated class for the ProjectFilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-project-filter',
  templateUrl: 'project-filter.html',
})
export class ProjectFilterPage {

  projectTypeList: ProjectTypeItemBean[];

  constructor(public viewCtrl: ViewController,
              public projectSer: ProjectService) {
    this.loadType();
  }

  loadType() {
    this.projectSer.getProjectCatalogListData(0)
      .subscribe(data => {
          this.projectTypeList = data.softwareTypes;
        },
        error => {
          console.error(error)
        })
  }

  itemSelected(item: ProjectTypeItemBean): boolean {
    this.viewCtrl.dismiss(item)
    return false;
  }
}
