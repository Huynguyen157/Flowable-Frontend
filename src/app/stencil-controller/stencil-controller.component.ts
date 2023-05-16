import { Component } from '@angular/core';
import { any } from '@uirouter/core';
import FLOWABLE from 'src/common/flowableURL';
@Component({
  selector: 'app-stencil-controller',
  templateUrl: './stencil-controller.component.html',
  styleUrls: ['./stencil-controller.component.css']
})
export class StencilControllerComponent {
  propertyWindowState = {'collapsed': false};
  headerConfig = FLOWABLE.HEADER_CONFIG;
  toggleWindow() {
    this.propertyWindowState.collapsed = !this.propertyWindowState.collapsed;
    setTimeout(() =>{
          window.dispatchEvent(new Event("resize"));
      }, 100);
  };
  editorFactory.promise.then () {

    /* Build stencil item list */

      // Build simple json representation of stencil set
      stencilItemGroups: [];

      // Helper method: find a group in an array
      findGroup(( name: any, groupArray : any[]) =>{
          for (var index = 0; index < groupArray.length; index++) {
              if (groupArray[index].name === name) {
                  return groupArray[index];
              }
          }
          return null;
      });
    };


}
