import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import FLOWABLE from 'src/common/flowableURL';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  flowableLogo = './assets/images/flowable-logo.png';

  account= 'HuyNQ188';
  FLOWABLE: any = {};
  constructor(private translate: TranslateService){
    this.translate.setDefaultLang('en');
    console.log('this.translate: ', this.translate);
  }

  ngOnInit(): void {
    console.log('getaccount', FLOWABLE.APP_URL.getModelHistoryUrl());

  };
  mainNavigation = [
    {
        'id': 'processes',
        'title': 'GENERAL.NAVIGATION.PROCESSES',
        'path': '/processes'
    },
    {
        'id': 'casemodels',
        'title': 'GENERAL.NAVIGATION.CASEMODELS',
        'path': '/casemodels'
    },
    {
        'id': 'forms',
        'title': 'GENERAL.NAVIGATION.FORMS',
        'path': '/forms'
    },
    {
        'id': 'decisions',
        'title': 'GENERAL.NAVIGATION.DECISIONS',
        'path': '/decisions'
    },
    {
        'id': 'apps',
        'title': 'GENERAL.NAVIGATION.APPS',
        'path': '/apps'
    }];
  mainPage = this.mainNavigation[0];
  setMainPage(mainPage: {
    id: string;
    title: string;
    path: string;
}) {
    this.mainPage = mainPage;
    window.location.hash = this.mainPage.path;
};
  backToLanding():void{

  }




}
