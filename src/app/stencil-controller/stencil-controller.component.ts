import { Component } from '@angular/core';
import { any } from '@uirouter/core';
import FLOWABLE from 'src/assets/common/flowableURL';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-stencil-controller',
  templateUrl: './stencil-controller.component.html',
  styleUrls: ['./stencil-controller.component.css'],
})
export class StencilControllerComponent {
  propertyWindowState = { collapsed: false };
  headerConfig = FLOWABLE.HEADER_CONFIG;
  constructor() {
    // this.editorFactory = new Promise((resolve, reject) => {
    // });
  }
  toggleWindow() {
    this.propertyWindowState.collapsed = !this.propertyWindowState.collapsed;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  promise() {
    const a = new Promise(() => {}).then(() => {});
  }

  // this.editorFactory.promise.then(() =>{
  //    /* Build stencil item list */
  //     // Build simple json representation of stencil set
  //     const stencilItemGroups: [];
  //     // Helper method: find a group in an array
  //     const findGroup =( name: any, groupArray : any[]) =>{
  //       return from (groupArray).pipe(map(group =>{

  //         if(group.name === name){
  //           return group;
  //         }
  //       })
  //     );
  //   };
  // });
}
