import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import FLOWABLE from 'src/common/flowableURL';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isOpenDropdown= false;
  flowableLogo = './assets/images/flowable-logo.png';
  authenticated = true;
  account= {
    firstName:'Test',
    lastName: 'Administrator'

  };
  FLOWABLE: any = {};
  constructor(private translate: TranslateService){
    this.translate.setDefaultLang('en');
    console.log('this.translate: ', this.translate);
  }
  currentAppDefinition={
      definition:{
        theme :'theme-1',
        icon : 'glyphicon-asterisk'
      },
      name: 'Administrator'
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
  logout(){}

}
