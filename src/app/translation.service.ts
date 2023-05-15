import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
 @Injectable({
    providedIn:'root'
 })
 export class TranslationService {
   constructor(private http: HttpClient){

   }
   public getTranslation(){
    return TranslateModule.forRoot({
      loader:{
        provide: TranslateHttpLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
   }
 }
