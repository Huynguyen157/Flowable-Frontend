import {
  Component,
  ViewChild,
  Injectable,
  ElementRef,
  Renderer2,
} from '@angular/core';
import FLOWABLE from 'src/assets/common/flowableURL';
import { editorManager } from '../editorManager.service';
// import CONFIG from 'src/assets/common/config';
import { any } from '@uirouter/angular';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-edit-controller',
  templateUrl: './edit-controller.component.html',
  styleUrls: ['./edit-controller.component.css'],
})
export class EditControllerComponent {
  forceSelectionRefresh = false;
  ignoreChanges = false;
  validationErrors = [];
  staticIncludeVersion = Date.now();
  orginalOryxButtonStyle: any;
  orginalResizerSEStyle: any;
  orginalResizerNWStyle: any;
  selectedElements: any;
  subSelectionElements: any;
  canvasSection: any;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private editorManagers: editorManager
  ) {}
  ngAfterViewInit() {
    const oryxButtons =
      this.elementRef.nativeElement.querySelectorAll('.Oryx_button');
    oryxButtons.forEach((button: any) => {
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
    let canvasSection = document.getElementById('canvasSection');
    this.canvasSection.scroll(() => {
      // Hides the resizer and quick menu items during scrolling

      this.selectedElements = this.editorManagers.getSelection();
      this.subSelectionElements = this.editorManagers.getSubSelection();
      this.selectedElements = this.selectedElements;
      this.subSelectionElements = this.subSelectionElements;
      if (this.selectedElements && this.selectedElements.length > 0) {
        const selectedElementBeforeScrolling = this.selectedElements[0];
      }

      // document.getElementsByClassName('Oryx_button').each((i, obj)=> {
      //       this.orginalOryxButtonStyle = obj.style.display;
      //       obj.style.display = 'none';
      // });
      // document.getElementsByClassName.each((i, obj) =>{
      //       this.orginalResizerSEStyle = obj.style.display;
      //       obj.style.display = 'none';
      // });
      // document.getElementsByClassName.each((i, obj) => {
      //       this.orginalResizerNWStyle = obj.style.display;
      //       obj.style.display = 'none';
      // });
      // this.editorManagers.handleEvents({
      //   type: ORYX.CONFIG.EVENT_CANVAS_SCROLL,
      // });
    });

    this.canvasSection.scrollStopped(() => {
      // Puts the quick menu items and resizer back when scroll is stopped.

      this.editorManagers.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
      this.editorManagers.setSelection(
        this.selectedElements,
        this.subSelectionElements
      );
      this.selectedElements = undefined;
      this.subSelectionElements = undefined;

      // handleDisplayProperty(obj) {
      //     if (jQuery(obj).position().top > 0) {
      //         obj.style.display = 'block';
      //     } else {
      //         obj.style.display = 'none';
      //     }
      // }

      // document.getElementsByClassName('Oryx_button').each((i, obj) =>{
      //     handleDisplayProperty(obj);
      // });
      // document.getElementsByClassName('.resizer_southeast').each((i, obj)=> {
      //     handleDisplayProperty(obj);
      // });
      // document.getElementsByClassName('.resizer_northwest').each((i, obj)=> {
      //     handleDisplayProperty(obj);
      // });
    });
  }
}
