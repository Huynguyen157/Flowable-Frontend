import { Component, Injectable, ElementRef, Renderer2  } from '@angular/core';
import FLOWABLE from 'src/common/flowableURL';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-edit-controller',
  templateUrl: './edit-controller.component.html',
  styleUrls: ['./edit-controller.component.css']
})
export class EditControllerComponent {
  forceSelectionRefresh = false;
  ignoreChanges = false;
  validationErrors = [];
  staticIncludeVersion = Date.now();
  constructor(private elementRef: ElementRef, private renderer: Renderer2){
  }
  ngAfterViewInit() {
    const oryxButtons = this.elementRef.nativeElement.querySelectorAll('.Oryx_button');
    oryxButtons.forEach(button => {
    this.renderer.setStyle(button, 'display', 'none');
    });
    }

/* Helper method to fetch model from server (always needed) */
//   fetchModel() {

//     var modelUrl;
//     if ($routeParams.modelId) {
//         modelUrl = FLOWABLE.URL.getModel($routeParams.modelId);
//     } else {
//         modelUrl = FLOWABLE.URL.newModelInfo();
//     }

//     $http({method: 'GET', url: modelUrl}).
//         success(function (data, status, headers, config) {
//             $rootScope.editor = new ORYX.Editor(data);
//             $rootScope.modelData = angular.fromJson(data);
//         console.log("stencil-controller 1")
//             $rootScope.editorFactory.resolve();
//         }).
//         error(function (data, status, headers, config) {
//             $location.path("/processes/");
//         });
// }

initScrollHandling() {
  let canvasSection = jQuery('#canvasSection');
  canvasSection.scroll(function() {

      // Hides the resizer and quick menu items during scrolling

      let selectedElements = editorManager.getSelection();
      let subSelectionElements = editorManager.getSubSelection();
      selectedElements = selectedElements;;
      subSelectionElements = subSelectionElements;
      if (selectedElements && selectedElements.length > 0)
      {
        selectedElementBeforeScrolling = selectedElements[0];
      }

      jQuery('.Oryx_button').each(function(i, obj) {
            this.orginalOryxButtonStyle = obj.style.display;
            obj.style.display = 'none';
      });
      jQuery('.resizer_southeast').each(function(i, obj) {
            this.orginalResizerSEStyle = obj.style.display;
            obj.style.display = 'none';
      });
      jQuery('.resizer_northwest').each(function(i, obj) {
            this.orginalResizerNWStyle = obj.style.display;
            obj.style.display = 'none';
      });
      editorManager.handleEvents({type:ORYX.CONFIG.EVENT_CANVAS_SCROLL});
  });

  canvasSection.scrollStopped(function(){

      // Puts the quick menu items and resizer back when scroll is stopped.

      editorManager.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
      editorManager.setSelection(selectedElements,subSelectionElements);
      selectedElements = undefined;
      subSelectionElements = undefined;

      handleDisplayProperty(obj) {
          if (jQuery(obj).position().top > 0) {
              obj.style.display = 'block';
          } else {
              obj.style.display = 'none';
          }
      }

      jQuery('.Oryx_button').each(function(i, obj) {
          handleDisplayProperty(obj);
      });
      jQuery('.resizer_southeast').each(function(i, obj) {
          handleDisplayProperty(obj);
      });
      jQuery('.resizer_northwest').each(function(i, obj) {
          handleDisplayProperty(obj);
      });

  });
}

}
