import { Component, OnInit } from '@angular/core';
import FLOWABLE from 'src/assets/common/flowableURL';
import { defer, Observable, Subscription } from 'rxjs';
import { editorManager } from '../editorManager.service';
@Component({
  selector: 'app-toolbar-controller',
  templateUrl: './toolbar-controller.component.html',
  styleUrls: ['./toolbar-controller.component.css'],
})
export class ToolbarControllerComponent {
  items: any = [];
  toolbarItems: any = [];
  secondaryItems: any = [];
  constructor(private editService: editorManager) {
    // this.editorFactory = defer();
  }
  ngOnInit() {
    this.toolbar();
  }
  editorFactory = defer(() => {
    return new Observable((subscriber) => {
      subscriber.complete();
    });
  });
  subscription: Subscription = this.editorFactory.subscribe(() => {
    this.toolbarItems = FLOWABLE.TOOLBAR_CONFIG.items;
    for (var i = 0; i < this.toolbarItems.length; i++) {
      // if (this.editService.modelData.model.modelType === 'form') {
      //   if (!this.toolbarItems[i].disableInForm) {
      //     this.items.push(this.toolbarItems[i]);
      //   }
      // } else {
      this.items.push(this.toolbarItems[i]);
      // }
    }
  });
  toolbar() {
    this.toolbarItems = FLOWABLE.TOOLBAR_CONFIG.items;
    for (var i = 0; i < this.toolbarItems.length; i++) {
      //   if (this.editService.modelData.model.modelType === 'form') {
      //     if (!this.toolbarItems[i].disableInForm) {
      //       return this.items.push(this.toolbarItems[i]);
      //     }
      //   } else {
      this.items.push(this.toolbarItems[i]);
      // }
    }
  }
}
