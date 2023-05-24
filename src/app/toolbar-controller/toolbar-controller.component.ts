import FLOWABLE from 'src/assets/common/flowableURL';
import { defer, Observable, Subscription } from 'rxjs';
import { editorManager } from '../editorManager.service';
import { Injectable } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-toolbar-controller',
  templateUrl: './toolbar-controller.component.html',
  styleUrls: ['./toolbar-controller.component.css'],
})
export class ToolbarControllerComponent {
  @Output() toolbarButtonClicked: EventEmitter<any> = new EventEmitter<any>();
  items: any = [];
  toolbarItems: any = [];
  secondaryItems: any = [];
  func: any;
  constructor(
    private editService: editorManager,
    private http: HttpClient,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
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
  buttonClicked(buttonIndex: number): void {
    const buttonClicked = this.items[buttonIndex];
    const services = {
      http: this.http,
      dialog: this.dialog,
      translate: this.translate,
    };
    this.executeFunctionByName(buttonClicked.action, window, services);

    const event = {
      type: 'TOOLBAR_BUTTON_CLICKED',
      toolbarItem: buttonClicked,
    };
    // Emit the event or perform other necessary operations
  }
  executeFunctionByName(
    functionName: string,
    context: any,
    ...args: any[]
  ): any {
    const namespaces = functionName.split('.');
    this.func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[this.func].apply(this, args);
  }
}
