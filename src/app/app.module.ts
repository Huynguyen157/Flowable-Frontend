import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UpgradeModule} from '@angular/upgrade/static';
import { EditControllerComponent } from './edit-controller/edit-controller.component';
import { EditUnsavedChangesPopupCtrlComponent } from './edit-unsaved-changes-popup-ctrl/edit-unsaved-changes-popup-ctrl.component';
import { FormBuilderControllerComponent } from './form-builder-controller/form-builder-controller.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EditControllerComponent,
    EditUnsavedChangesPopupCtrlComponent,
    FormBuilderControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap(){
    this.upgrade.bootstrap(document.body,['flowable-frontend'], {strictDi: true} )
  }
}
