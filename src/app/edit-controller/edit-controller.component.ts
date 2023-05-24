import {
  Component,
  ViewChild,
  Injectable,
  ElementRef,
  Renderer2,
  HostListener,
  OnInit,
} from '@angular/core';
import FLOWABLE from 'src/assets/common/flowableURL';
import { editorManager } from '../editorManager.service';
import ORYX from 'src/assets/common/config';
import { ActivatedRoute, Router } from '@angular/router';
import { defer, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  editorInitialized!: boolean;
  editor: any;
  paletteSectionFooter: any;
  paletteHelpWrapper: any;
  contentCanvasWrapper: any;
  paletteSectionOpen: any;
  selectedElementBeforeScrolling: any;
  offset: any;
  offsetTop: any;
  offsetLeft: any;
  propSectionHeight: any;
  canvas: any;
  mainHeader: any;
  footerHeight: any;
  treeViewHeight: any;
  editorHistory: any = [];
  resourceId: any;
  modelData: any;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private editorManagers: editorManager,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // this.editorFlowable();
  }
  ngAfterViewInit() {
    const oryxButtons =
      this.elementRef.nativeElement.querySelectorAll('.Oryx_button');
    oryxButtons.forEach((button: any) => {
      this.renderer.setStyle(button, 'display', 'none');
    });
  }

  editorFactory = defer(() => {
    return new Observable((subscriber) => {
      subscriber.complete();
    });
  });
  @HostListener('window:click', ['$event']) onClick(event: any) {}
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth;
  }

  /* Helper method to fetch model from server (always needed) */
  //   fetchModel() {

  //     var modelUrl;
  //     if ($routeParams.modelId) {
  //         modelUrl = FLOWABLE.URL.getModel($routeParams.modelId);
  //     } else {
  //         modelUrl = FLOWABLE.URL.newModelInfo();
  //     }
  //     this.http.get(modelUrl).subscribe(
  //       (data: any) => {
  //         this.editor = new ORYX.Editor(data);
  //         this.modelData = JSON.parse(data);
  //         this.editorFactory.resolve();
  //       },
  //       (error: any) => {
  //         this.router.navigate(['/processes']);
  //       }
  //     );
  // }

  initScrollHandling() {
    this.canvasSection = document.getElementById('canvasSection');
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
  editorFlowable() {
    if (!this.editorInitialized) {
      this.paletteHelpWrapper = document.getElementById('paletteHelpWrapper');
      this.paletteSectionFooter = document.getElementById(
        'paletteSectionFooter'
      );
      this.paletteSectionOpen = document.getElementById('paletteSectionOpen');
      this.contentCanvasWrapper = document.getElementById(
        'contentCanvasWrapper'
      );

      this.paletteSectionFooter.on('click', () => {
        this.paletteHelpWrapper.addClass('close');
        this.contentCanvasWrapper.addClass('collapsedCanvasWrapper');
        this.paletteSectionOpen.removeClass('hidden');
      });

      this.paletteSectionOpen.on('click', () => {
        this.paletteHelpWrapper.removeClass('close');
        this.contentCanvasWrapper.removeClass('collapsedCanvasWrapper');
        this.paletteSectionOpen.addClass('hidden');
      });
      /**
       * A 'safer' apply that avoids concurrent updates (which $apply allows).
       */

      this.addHistoryItem(this.resourceId);
      this.getStencilSetName();
      this.flowable();
      // Hook in resizing of main panels when window resizes
      // TODO: perhaps move to a separate JS-file?
      window.addEventListener('resize', (event) => {
        this.offsetTop = document.getElementById('editor-header')?.offsetTop;
        this.offsetLeft = document.getElementById('editor-header')?.offsetLeft;
        this.propSectionHeight =
          document.getElementById('propertySection')?.offsetHeight;
        this.canvas = document.getElementById('canvasSection');
        this.mainHeader = document.getElementById('#main-header');

        if (
          this.offset == undefined ||
          this.offset === null ||
          this.propSectionHeight === undefined ||
          this.propSectionHeight === null ||
          this.canvas === undefined ||
          this.canvas === null ||
          this.mainHeader === null
        ) {
          return;
        }

        if (this.editor) {
          let selectedElements = this.editorManagers.getSelection();
          let subSelectionElements = this.editorManagers.getSelection();

          if (selectedElements && selectedElements.length > 0) {
            this.selectedElementBeforeScrolling = selectedElements[0];

            this.editorManagers.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
            this.editorManagers.setSelection(
              this.selectedElements,
              this.subSelectionElements
            );
            this.selectedElements = undefined;
            this.subSelectionElements = undefined;
          }
        }
        let totalAvailable =
          window.innerHeight -
          this.offsetTop -
          this.mainHeader.nativeElement.offsetHeight -
          21;
        // let totalAvailable = jQuery(window).height() - this.offset.top - mainHeader.height() - 21;
        this.canvas.height(totalAvailable - this.propSectionHeight);
        this.footerHeight = document.getElementById(
          'paletteSectionFooter'
        )?.offsetHeight;
        this.treeViewHeight = document.getElementById(
          'process-treeview-wrapper'
        )?.offsetHeight;
        // jQuery('#paletteSection').height(
        //   totalAvailable - this.treeViewHeight - this.footerHeight
        // );

        // Update positions of the resize-markers, according to the canvas

        var actualCanvas = null;
        if (this.canvas && this.canvas[0].children[1]) {
          actualCanvas = this.canvas[0].children[1];
        }

        var canvasTop = this.canvas.position().top;
        var canvasLeft = this.canvas.position().left;
        var canvasHeight = this.canvas[0].clientHeight;
        var canvasWidth = this.canvas[0].clientWidth;
        var iconCenterOffset = 8;
        var widthDiff = 0;

        var actualWidth = 0;
        if (actualCanvas) {
          // In some browsers, the SVG-element clientwidth isn't available, so we revert to the parent
          actualWidth =
            actualCanvas.clientWidth || actualCanvas.parentNode.clientWidth;
        }

        if (actualWidth < this.canvas[0].clientWidth) {
          widthDiff = actualWidth - this.canvas[0].clientWidth;
          // In case the canvas is smaller than the actual viewport, the resizers should be moved
          canvasLeft -= widthDiff / 2;
          canvasWidth += widthDiff;
        }

        var iconWidth = 17;
        var iconOffset = 20;

        var north = document.getElementById('canvas-grow-N');
        north!.style.top = canvasTop + iconOffset + 'px';
        north!.style.left =
          canvasLeft - 10 + (canvasWidth - iconWidth) / 2 + 'px';

        var south = document.getElementById('canvas-grow-S');
        south!.style.top =
          canvasTop + canvasHeight - iconOffset - iconCenterOffset + 'px';
        south!.style.left =
          canvasLeft - 10 + (canvasWidth - iconWidth) / 2 + 'px';

        var east = document.getElementById('canvas-grow-E');
        east!.style.top =
          canvasTop - 10 + (canvasHeight - iconWidth) / 2 + 'px';
        east!.style.left =
          canvasLeft + canvasWidth - iconOffset - iconCenterOffset + 'px';

        var west = document.getElementById('canvas-grow-W');
        west!.style.top = `${
          canvasTop - 10 + (canvasHeight - iconWidth) / 2
        }px`;
        west!.style.left = `${canvasLeft + iconOffset}px`;
        // var west = jQuery('#canvas-grow-W');
        // west.css('top', canvasTop - 10 + (canvasHeight - iconWidth) / 2 + 'px');
        // west.css('left', canvasLeft + iconOffset + 'px');

        north = document.getElementById('canvas-shrink-N');
        north!.style.top = canvasTop + iconOffset + 'px';
        north!.style.left =
          canvasLeft + 10 + (canvasWidth - iconWidth) / 2 + 'px';

        south = document.getElementById('canvas-shrink-S');
        south!.style.top =
          canvasTop + canvasHeight - iconOffset - iconCenterOffset + 'px';
        south!.style.left =
          canvasLeft + 10 + (canvasWidth - iconWidth) / 2 + 'px';

        east = document.getElementById('canvas-shrink-E');
        east!.style.top =
          canvasTop + 10 + (canvasHeight - iconWidth) / 2 + 'px';
        east!.style.left =
          canvasLeft + canvasWidth - iconOffset - iconCenterOffset + 'px';

        west = document.getElementById('#canvas-shrink-W');
        west!.style.top = `${
          canvasTop + 10 + (canvasHeight - iconWidth) / 2
        }px`;
        west!.style.left = `${canvasLeft + iconOffset}px`;
      });

      // jQuery(window).trigger('resize');

      // jQuery.fn.scrollStopped =(callback: any) {
      //   jQuery(this).scroll(function () {
      //     var self = this,
      //       $this = jQuery(self);
      //     if ($this.data('scrollTimeout')) {
      //       clearTimeout($this.data('scrollTimeout'));
      //     }
      //     $this.data('scrollTimeout', setTimeout(callback, 50, self));
      //   })
      // };

      FLOWABLE.eventBus.addListener(
        'ORYX-EDITOR-LOADED',
        () => {
          this.editorFactory.subscribe();
          this.editorInitialized = true;
          this.modelData = this.editorManagers.getBaseModelData();
          this.editorManagers.setModel(this.modelData);
        },
        this
      );

      // FLOWABLE.eventBus.addListener(
      //   FLOWABLE.eventBus.EVENT_TYPE_EDITOR_READY,
      //   () => {
      //     var url = window.location.href;
      //     var regex = new RegExp('[?&]subProcessId(=([^&#]*)|&|#|$)');
      //     var results = regex.exec(url);
      //     if (results && results[2]) {
      //       this.editorManagers.edit(
      //         decodeURIComponent(results[2].replace(/\+/g, ' '))
      //       );
      //     }
      //   }
      // );
    }
  }

  // safeApply(fn:any) {
  //   if (this.$root) {
  //     var phase = this.$root.$$phase;
  //     if (phase == '$apply' || phase == '$digest') {
  //       if (fn && typeof fn === 'function') {
  //         fn();
  //       }
  //     } else {
  //       this.$apply(fn);
  //     }
  //   } else {
  //     this.$apply(fn);
  //   }
  // };

  addHistoryItem(resourceId: any) {
    var modelMetaData = this.editorManagers.getBaseModelData();

    var historyItem: any = {
      id: modelMetaData.modelId,
      name: modelMetaData.name,
      key: modelMetaData.key,
      stepId: resourceId,
      type: 'bpmnmodel',
    };

    if (
      this.editorManagers.getCurrentModelId() !=
      this.editorManagers.getModelId()
    ) {
      historyItem.subProcessId = this.editorManagers.getCurrentModelId();
    }

    this.editorHistory.push(historyItem);
  }

  getStencilSetName() {
    var modelMetaData = this.editorManagers.getBaseModelData();
    if (
      modelMetaData.model.stencilset.namespace ==
      'http://b3mn.org/stencilset/cmmn1.1#'
    ) {
      return 'cmmn1.1';
    } else {
      return 'bpmn2.0';
    }
  }

  /**
   * Initialize the event bus: couple all Oryx events with a dispatch of the
   * event of the event bus. This way, it gets much easier to attach custom logic
   * to any event.
   */

  flowable() {
    var formItems = undefined;

    FLOWABLE.eventBus.editor = this.editor;

    var eventMappings = [
      {
        oryxType: ORYX.CONFIG.EVENT_SELECTION_CHANGED,
        flowableType: FLOWABLE.eventBus.EVENT_TYPE_SELECTION_CHANGE,
      },
      {
        oryxType: ORYX.CONFIG.EVENT_DBLCLICK,
        flowableType: FLOWABLE.eventBus.EVENT_TYPE_DOUBLE_CLICK,
      },
      {
        oryxType: ORYX.CONFIG.EVENT_MOUSEOUT,
        flowableType: FLOWABLE.eventBus.EVENT_TYPE_MOUSE_OUT,
      },
      {
        oryxType: ORYX.CONFIG.EVENT_MOUSEOVER,
        flowableType: FLOWABLE.eventBus.EVENT_TYPE_MOUSE_OVER,
      },
      {
        oryxType: ORYX.CONFIG.EVENT_EDITOR_INIT_COMPLETED,
        flowableType: FLOWABLE.eventBus.EVENT_TYPE_EDITOR_READY,
      },
      {
        oryxType: ORYX.CONFIG.EVENT_PROPERTY_CHANGED,
        flowableType: FLOWABLE.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED,
      },
    ];

    eventMappings.forEach((eventMapping) => {
      this.editorManagers.registerOnEvent(
        eventMapping.oryxType,
        (event: any) => {
          FLOWABLE.eventBus.dispatch(eventMapping.flowableType, event);
        }
      );
    });

    // Show getting started if this is the first time (boolean true for use local storage)
    // FLOWABLE_EDITOR_TOUR.gettingStarted($scope, $translate, $q, true);
  }
}
