import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UpgradeModule } from '@angular/upgrade/static';
import { EditControllerComponent } from './edit-controller/edit-controller.component';
import { FormBuilderControllerComponent } from './form-builder-controller/form-builder-controller.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './translation.service';
import { StencilControllerComponent } from './stencil-controller/stencil-controller.component';
import { ToolbarControllerComponent } from './toolbar-controller/toolbar-controller.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'editor/:modelId', component: EditControllerComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    StencilControllerComponent,
    EditControllerComponent,
    FormBuilderControllerComponent,
    ToolbarControllerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: TranslationService, useClass: TranslationService }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['flowable-frontend'], {
      strictDi: true,
    });
  }
}
